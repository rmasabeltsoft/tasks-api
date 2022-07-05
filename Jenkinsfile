pipeline {
   agent { label 'master-only' }
   
   tools {nodejs "node.js 16"}
   stages {
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