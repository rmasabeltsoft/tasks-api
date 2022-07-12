pipeline {

   agent { label 'generic' }
   
   tools { nodejs 'node.js 16' }

   stages {

      stage('Development Variables') {
         when {
            branch 'dev'
         }
         environment { 
            DOCKER_LABEL = 'dev'
            APP_ENVIRONMENT = 'development'
         }
         steps {
            sh 'echo APP_ENVIRONMENT: $APP_ENVIRONMENT'
         }
      }

      stage('QA Variables') {
         when {
            branch 'qa'
         }
         environment { 
            DOCKER_LABEL = 'qa'
            APP_ENVIRONMENT = 'qa'
         }
         steps {
            sh 'echo APP_ENVIRONMENT: $APP_ENVIRONMENT'
         }
      }

      stage('Production Variables') {
         when {
            branch 'main'
         }
         environment { 
            DOCKER_LABEL = 'latest'
            APP_ENVIRONMENT = 'production'
         }
         steps {
            sh 'echo APP_ENVIRONMENT: $APP_ENVIRONMENT'
         }
      }
      
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
         when {
            anyOf {
               branch 'dev'
               branch 'qa'
               branch 'main'
            }
         }
         steps {
            script{
               app = docker.build('tasks-api')
            }
         }
      }

      stage('Docker Push Development') {
         when {
            branch 'dev'
         }
         steps {
            script{
               docker.withRegistry('https://830931683151.dkr.ecr.us-east-1.amazonaws.com', 'ecr:us-east-1:jenkins.tsoft') {
                  app.push('${env.BUILD_NUMBER}')
                  app.push('dev')
               }
            }
         }
      }

      stage('Docker Push QA') {
         when {
            branch 'qa'
         }
         steps {
            script{
               docker.withRegistry('https://830931683151.dkr.ecr.us-east-1.amazonaws.com', 'ecr:us-east-1:jenkins.tsoft') {
                  app.push('${env.BUILD_NUMBER}')
                  app.push('qa')
               }
            }
         }
      }

      stage('Docker Push Production') {
         when {
            branch 'main'
         }
         steps {
            script{
               docker.withRegistry('https://830931683151.dkr.ecr.us-east-1.amazonaws.com', 'ecr:us-east-1:jenkins.tsoft') {
                  app.push('${env.BUILD_NUMBER}')
                  app.push('latest')
               }
            }
         }
      }

      stage('Deploy to QA') {
         when {
            branch 'qa'
         }
         steps {
            sh 'aws eks update-kubeconfig --region us-east-1 --name pstdemo'
            sh 'kubectl apply -f tasks-api-full-qa.yaml'
         }
      }

      stage('Deploy to Production') {
         when {
            branch 'main'
         }
         steps {
            sh 'aws eks update-kubeconfig --region us-east-1 --name pstdemo'
            sh 'kubectl apply -f tasks-api-full.yaml'
         }
      }
   }
}