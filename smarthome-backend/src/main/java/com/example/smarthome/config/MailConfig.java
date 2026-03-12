package com.example.smarthome.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class MailConfig {

    @Bean
    public JavaMailSender javaMailSender(
            @Value("${spring.mail.host}") String host,
            @Value("${spring.mail.port}") int port,
            @Value("${spring.mail.username}") String username,
            @Value("${spring.mail.password}") String password,
            @Value("${spring.mail.properties.mail.smtp.auth:true}") boolean smtpAuth,
            @Value("${spring.mail.properties.mail.smtp.starttls.enable:true}") boolean startTlsEnabled,
            @Value("${spring.mail.properties.mail.smtp.starttls.required:false}") boolean startTlsRequired,
            @Value("${spring.mail.properties.mail.smtp.connectiontimeout:5000}") int connectionTimeout,
            @Value("${spring.mail.properties.mail.smtp.timeout:5000}") int timeout,
            @Value("${spring.mail.properties.mail.smtp.writetimeout:5000}") int writeTimeout,
            @Value("${spring.mail.properties.mail.smtp.auth.mechanisms:LOGIN PLAIN}") String authMechanisms,
            @Value("${spring.mail.properties.mail.debug:false}") boolean mailDebug
    ) {
        JavaMailSenderImpl sender = new JavaMailSenderImpl();
        sender.setHost(host);
        sender.setPort(port);
        sender.setUsername(username == null ? "" : username.trim());

        // Gmail app passwords are shown with spaces; strip whitespace defensively.
        String normalizedPassword = password == null ? "" : password.replaceAll("\\s+", "");
        sender.setPassword(normalizedPassword);

        Properties props = sender.getJavaMailProperties();
        props.put("mail.smtp.auth", String.valueOf(smtpAuth));
        props.put("mail.smtp.starttls.enable", String.valueOf(startTlsEnabled));
        props.put("mail.smtp.starttls.required", String.valueOf(startTlsRequired));
        props.put("mail.smtp.connectiontimeout", String.valueOf(connectionTimeout));
        props.put("mail.smtp.timeout", String.valueOf(timeout));
        props.put("mail.smtp.writetimeout", String.valueOf(writeTimeout));
        props.put("mail.smtp.auth.mechanisms", authMechanisms);
        props.put("mail.debug", String.valueOf(mailDebug));

        return sender;
    }
}
