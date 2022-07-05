pipeline {
   agent any
   
   tools {nodejs "node"}
   stages {
      stage('Git') {
         steps {
            git 'https://github.com/rmasabeltsoft/tasks-api'
         }
      }
      
      stage('Build') {
         steps {
            sh 'npm install'
         }
      }
      
      stage('Test') {
         steps {
            sh 'node test'
         }
      }
   }
}