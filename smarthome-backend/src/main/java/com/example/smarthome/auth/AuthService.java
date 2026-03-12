package com.example.smarthome.auth;

import com.example.smarthome.auth.dto.AuthResponse;
import com.example.smarthome.auth.dto.ForgotPasswordRequest;
import com.example.smarthome.auth.dto.RegisterRequest;
import com.example.smarthome.auth.dto.ResetPasswordRequest;
import com.example.smarthome.auth.dto.VerifyOtpRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class AuthService {
    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    private final UserAccountRepository userAccountRepository;
    private final JavaMailSender mailSender;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.otp.validity-minutes:5}")
    private long otpValidityMinutes;

    @Value("${app.reset.validity-minutes:10}")
    private long resetValidityMinutes;

    @Value("${spring.mail.username:no-reply@smarthome.local}")
    private String fromEmail;

    @Value("${spring.mail.password:}")
    private String mailPassword;

    @Value("${app.otp.delivery-mode:email_or_log}")
    private String otpDeliveryMode;

    public AuthService(
            UserAccountRepository userAccountRepository,
            JavaMailSender mailSender,
            PasswordEncoder passwordEncoder
    ) {
        this.userAccountRepository = userAccountRepository;
        this.mailSender = mailSender;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public AuthResponse registerAndSendOtp(RegisterRequest request) {
        validateRegisterRequest(request);

        UserAccount user = userAccountRepository.findByEmail(request.getEmail().trim().toLowerCase())
                .orElseGet(UserAccount::new);

        if (user.getId() != null && user.isVerified()) {
            throw new AuthException("Account already exists and is verified. Please sign in.");
        }

        String otp = generateOtp();
        LocalDateTime expiry = LocalDateTime.now().plusMinutes(otpValidityMinutes);

        user.setFullName(request.getFullName().trim());
        user.setEmail(request.getEmail().trim().toLowerCase());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPrimaryInterest(request.getPrimaryInterest().trim());
        user.setVerified(false);
        user.setOtp(otp);
        user.setOtpExpiresAt(expiry);
        user.setPasswordResetVerifiedAt(null);

        userAccountRepository.save(user);
        String deliveryMessage = deliverOtp(user.getEmail(), otp, otpValidityMinutes, "Account Verification OTP");

        return new AuthResponse(deliveryMessage, user.getEmail());
    }

    @Transactional
    public AuthResponse verifyOtp(VerifyOtpRequest request) {
        if (request == null || isBlank(request.getEmail()) || isBlank(request.getOtp())) {
            throw new AuthException("Email and OTP are required.");
        }

        UserAccount user = userAccountRepository.findByEmail(request.getEmail().trim().toLowerCase())
                .orElseThrow(() -> new AuthException("User not found."));

        if (user.isVerified()) {
            verifyForgotPasswordOtpForVerifiedUser(user, request.getOtp().trim());
            return new AuthResponse("OTP verified successfully. Continue to reset password.", user.getEmail());
        }

        if (user.getOtp() == null || user.getOtpExpiresAt() == null || LocalDateTime.now().isAfter(user.getOtpExpiresAt())) {
            throw new AuthException("OTP expired. Please create account again.");
        }

        if (!user.getOtp().equals(request.getOtp().trim())) {
            throw new AuthException("Invalid OTP");
        }

        user.setVerified(true);
        user.setOtp(null);
        user.setOtpExpiresAt(null);
        user.setPasswordResetVerifiedAt(null);
        userAccountRepository.save(user);

        return new AuthResponse("Account Created Successfully", user.getEmail());
    }

    @Transactional
    public AuthResponse forgotPassword(ForgotPasswordRequest request) {
        if (request == null || isBlank(request.getEmail())) {
            throw new AuthException("Email is required.");
        }

        UserAccount user = userAccountRepository.findByEmail(request.getEmail().trim().toLowerCase())
                .orElseThrow(() -> new AuthException("No account found for this email."));

        if (!user.isVerified()) {
            throw new AuthException("Account is not verified yet. Please complete account verification first.");
        }

        String otp = generateOtp();
        LocalDateTime expiry = LocalDateTime.now().plusMinutes(otpValidityMinutes);

        user.setOtp(otp);
        user.setOtpExpiresAt(expiry);
        user.setPasswordResetVerifiedAt(null);
        userAccountRepository.save(user);

        String deliveryMessage = deliverOtp(user.getEmail(), otp, otpValidityMinutes, "Password Reset OTP");
        return new AuthResponse(deliveryMessage, user.getEmail());
    }

    @Transactional
    public AuthResponse resetPassword(ResetPasswordRequest request) {
        if (request == null || isBlank(request.getEmail()) || isBlank(request.getNewPassword()) || isBlank(request.getConfirmPassword())) {
            throw new AuthException("Email, new password and confirm password are required.");
        }

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new AuthException("Passwords do not match.");
        }

        UserAccount user = userAccountRepository.findByEmail(request.getEmail().trim().toLowerCase())
                .orElseThrow(() -> new AuthException("No account found for this email."));

        if (user.getPasswordResetVerifiedAt() == null) {
            throw new AuthException("Please verify OTP before resetting password.");
        }

        LocalDateTime resetWindowExpiry = user.getPasswordResetVerifiedAt().plusMinutes(resetValidityMinutes);
        if (LocalDateTime.now().isAfter(resetWindowExpiry)) {
            user.setPasswordResetVerifiedAt(null);
            userAccountRepository.save(user);
            throw new AuthException("Reset session expired. Please request OTP again.");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        user.setPasswordResetVerifiedAt(null);
        user.setOtp(null);
        user.setOtpExpiresAt(null);
        userAccountRepository.save(user);

        return new AuthResponse("Password reset successful. Please sign in.", user.getEmail());
    }

    private void validateRegisterRequest(RegisterRequest request) {
        if (request == null || isBlank(request.getFullName()) || isBlank(request.getEmail())
                || isBlank(request.getPassword()) || isBlank(request.getPrimaryInterest())) {
            throw new AuthException("All fields are required.");
        }
    }

    private String generateOtp() {
        return String.format("%06d", new Random().nextInt(1_000_000));
    }

    private String deliverOtp(String to, String otp, long validityMinutes, String otpType) {
        String mode = otpDeliveryMode == null ? "email_or_log" : otpDeliveryMode.trim().toLowerCase();

        if ("log".equals(mode)) {
            log.info("OTP for {} is {} (valid {} minutes).", to, otp, validityMinutes);
            return "OTP generated in development mode. Check backend logs for OTP.";
        }

        if ("email".equals(mode)) {
            sendOtpEmailStrict(to, otp, validityMinutes, otpType);
            return "OTP sent successfully to your email.";
        }

        try {
            sendOtpEmailStrict(to, otp, validityMinutes, otpType);
            return "OTP sent successfully to your email.";
        } catch (AuthException ex) {
            log.warn("Email delivery failed, using log fallback for {}. Reason: {}", to, ex.getMessage());
            log.info("OTP for {} is {} (valid {} minutes).", to, otp, validityMinutes);
            return "OTP generated. Check backend logs for OTP if email is not configured.";
        }
    }

    private void sendOtpEmailStrict(String to, String otp, long validityMinutes, String otpType) {
        try {
            if (isBlank(fromEmail)) {
                throw new AuthException("Mail username is not configured. Set MAIL_USERNAME or spring.mail.username.");
            }
            if (isBlank(mailPassword)) {
                throw new AuthException("Mail password is not configured. Set MAIL_PASSWORD or spring.mail.password.");
            }
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setSubject("Smart Home Energy - " + otpType);
            message.setText("Your OTP is: " + otp
                    + ". It is valid for " + validityMinutes + " minutes.");
            mailSender.send(message);
        } catch (Exception ex) {
            String reason = rootCauseMessage(ex);
            log.error("Failed to send OTP mail to {}: {}", to, reason, ex);
            throw new AuthException("Could not send OTP email: " + reason);
        }
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }

    private void verifyForgotPasswordOtpForVerifiedUser(UserAccount user, String otpInput) {
        if (user.getOtp() == null || user.getOtpExpiresAt() == null || LocalDateTime.now().isAfter(user.getOtpExpiresAt())) {
            throw new AuthException("OTP expired. Please request a new OTP.");
        }

        if (!user.getOtp().equals(otpInput)) {
            throw new AuthException("Invalid OTP");
        }

        user.setOtp(null);
        user.setOtpExpiresAt(null);
        user.setPasswordResetVerifiedAt(LocalDateTime.now());
        userAccountRepository.save(user);
    }

    private String rootCauseMessage(Throwable ex) {
        Throwable current = ex;
        while (current.getCause() != null) {
            current = current.getCause();
        }
        String message = current.getMessage();
        return isBlank(message) ? ex.getMessage() : message;
    }
}
