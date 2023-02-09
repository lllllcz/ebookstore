package com.example.ebook_back;

import org.apache.catalina.Context;
import org.apache.catalina.connector.Connector;
import org.apache.tomcat.util.descriptor.web.SecurityCollection;
import org.apache.tomcat.util.descriptor.web.SecurityConstraint;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource("classpath:application-store.properties")
public class EbookBackApplication {

    @Bean
    public FilterRegistrationBean replaceTokenFilter(){
        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setFilter( new CorsFilter());
        registration.addUrlPatterns("/*");
        registration.setName("CorsFilter ");
        registration.setOrder(1);
        return registration;
    }

//    @Bean
//    public Connector connector(){
//        Connector connector=new Connector("org.apache.coyote.http11.Http11NioProtocol");
//        connector.setScheme("http");
//        connector.setPort(8080);
//        connector.setSecure(false);
//        connector.setRedirectPort(8443);
//        return connector;
//    }

//    @Bean
//    public TomcatServletWebServerFactory tomcatServletWebServerFactory(Connector connector){
//        TomcatServletWebServerFactory tomcat=new TomcatServletWebServerFactory(){
//            @Override
//            protected void postProcessContext(Context context) {
//            SecurityConstraint securityConstraint=new SecurityConstraint();
//            securityConstraint.setUserConstraint("CONFIDENTIAL");
//            SecurityCollection collection=new SecurityCollection();
//            collection.addPattern("/noPageUseHTTPS");
//            securityConstraint.addCollection(collection);
//            context.addConstraint(securityConstraint);
//            }
//        };
//        tomcat.addAdditionalTomcatConnectors(connector);
//        return tomcat;
//    }


    public static void main(String[] args) {
        SpringApplication.run(EbookBackApplication.class, args);
    }

}
