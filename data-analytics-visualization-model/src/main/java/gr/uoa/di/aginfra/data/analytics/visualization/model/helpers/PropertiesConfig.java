package gr.uoa.di.aginfra.data.analytics.visualization.model.helpers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

import java.io.File;


@Configuration
public class PropertiesConfig {

    @Autowired
    public Environment environment;

    public ApiConfigTemplate apiconfig;



    public ApiConfigTemplate getProperties() {

        System.out.println("I'm in config and im instantiating");

        return new ApiConfigTemplate(environment.getProperty("gr.uoa.di.aginfra.data.analytics.visualization.model.tempdir"),
                environment.getRequiredProperty("gr.uoa.di.aginfra.data.analytics.visualization.model.default.tempdir"));


    }

    public class ApiConfigTemplate{

        private String tempDirectory, defaultTempDirectory;

        public ApiConfigTemplate(String tempDirectory, String defaultTempDirectory) {

            super();
            this.tempDirectory = tempDirectory;
            this.defaultTempDirectory = defaultTempDirectory;
            if(this.tempDirectory == null || tempDirectory.length() ==0){
                this.tempDirectory = System.getProperty("java.io.tmpdir") + defaultTempDirectory;
            }

        }


        public String getTempDirectory() {
            return tempDirectory;
        }

        public void setTempDirectory(String tempDirectory) {
            this.tempDirectory = tempDirectory;
        }

        public String getDefaultTempDirectory() {
            return defaultTempDirectory;
        }

        public void setDefaultTempDirectory(String defaultTempDirectory) {
            this.defaultTempDirectory = defaultTempDirectory;
        }
    }


}
