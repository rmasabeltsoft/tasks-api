pipeline {
   agent any
   
   tools {nodejs "node.js 18.4.0"}
   stages {
      stage('Git') {
         steps {
            git url: 'https://github.com/rmasabeltsoft/tasks-api',
            credentialsId: 'rmasabeltsoft'
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