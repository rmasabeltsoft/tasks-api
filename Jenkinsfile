pipeline {
   agent { label 'generic' }
   
   tools {nodejs "node.js 16"}
   stages {
      stage('Build') {
         steps {
            sh 'npm install'
         }
      }
      
      stage('Test') {
         steps {
            sh 'npm test'
         }
      }
   }
}