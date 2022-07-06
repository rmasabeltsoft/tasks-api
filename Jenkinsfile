pipeline {
   agent { label 'generic' }
   
   tools {nodejs "node.js 16"}
   stages {
      stage('Node Build') {
         steps {
            sh 'npm install'
         }
      }
      
      stage('Node Test') {
         steps {
            sh 'npm test'
         }
      }

      stage('Docker Build') {
         steps {
            script{
               app = docker.build("tasks-api")
            }
         }
      }
   }
}