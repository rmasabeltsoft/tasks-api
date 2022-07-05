pipeline {
   agent { label 'master-only' }
   
   tools {nodejs "node.js 18.4.0"}
   stages {
      stage('Git') {
         steps {
            git 'git@github.com:rmasabeltsoft/tasks-api.git'
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