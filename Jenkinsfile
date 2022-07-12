pipeline {

   agent { label 'generic' }
   
   tools { nodejs 'node.js 16' }

   stages {

      stage("Config vars") {
         steps {
            script {
               switch(branch) {
                  case 'dev':
                     DOCKER_LABEL = 'dev'
                     APP_ENVIRONMENT = 'dev'
                     break
                  case 'qa':
                     DOCKER_LABEL = 'qa'
                     APP_ENVIRONMENT = 'qa'
                     break
                  case "main":
                     DOCKER_LABEL = 'latest'
                     APP_ENVIRONMENT = 'production'
                     break
                  default:
                     DOCKER_LABEL = ''
                     APP_ENVIRONMENT = ''
               }
            }
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

      stage('Docker Push') {
         when {
            anyOf {
               branch 'dev'
               branch 'qa'
               branch 'main'
            }
         }
         steps {
            script{
               docker.withRegistry('https://830931683151.dkr.ecr.us-east-1.amazonaws.com', 'ecr:us-east-1:jenkins.tsoft') {
                  app.push('${env.BUILD_NUMBER}')
                  app.push('${env.DOCKER_LABEL}')
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