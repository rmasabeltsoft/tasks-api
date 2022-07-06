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

      stage('Docker Push') {
         steps {
            script{
               docker.withRegistry('https://830931683151.dkr.ecr.us-east-1.amazonaws.com') {
                  app.push("${env.BUILD_NUMBER}")
                  app.push("v1")
                  app.push("latest")
               }
            }
         }
      }
   }
}