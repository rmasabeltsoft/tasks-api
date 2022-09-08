def app
def dockerLabel
def buildNumber = currentBuild.number

pipeline {

   agent { label 'generic' }
   
   tools { nodejs 'node.js 16' }

   stages {

      stage('Development Variables') {
         when {
            branch 'dev'
         }
         environment { 
            APP_ENVIRONMENT = 'development'
         }
         steps {
            script {
               dockerLabel = 'dev'
            }
            sh 'echo APP_ENVIRONMENT: $APP_ENVIRONMENT'
         }
      }

      stage('QA Variables') {
         when {
            branch 'qa'
         }
         environment { 
            APP_ENVIRONMENT = 'qa'
         }
         steps {
            script {
               dockerLabel = 'qa'
            }
            sh 'echo APP_ENVIRONMENT: $APP_ENVIRONMENT'
         }
      }

      stage('Production Variables') {
         when {
            branch 'main'
         }
         environment {
            APP_ENVIRONMENT = 'production'
         }
         steps {
            script {
               dockerLabel = 'latest'
            }
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

      stage('Test_Checkmarx') {
         when {
            branch 'dev'
         }
         steps {
            echo 'Testing Checkmarx...'
            step([$class: 'CxScanBuilder', comment: '', configAsCode: true, credentialsId: 'Checkmarx_Cred', customFields: '', excludeFolders: '', exclusionsSetting: 'global', failBuildOnNewResults: false, failBuildOnNewSeverity: 'HIGH', filterPattern: '''!**/_cvs/**/*, !**/.svn/**/*, !**/.hg/**/*, !**/.git/**/*, !**/.bzr/**/*,
            !**/.gitgnore/**/*, !**/.gradle/**/*, !**/.checkstyle/**/*, !**/.classpath/**/*, !**/bin/**/*,
            !**/obj/**/*, !**/backup/**/*, !**/.idea/**/*, !**/*.DS_Store, !**/*.ipr, !**/*.iws,
            !**/*.bak, !**/*.tmp, !**/*.aac, !**/*.aif, !**/*.iff, !**/*.m3u, !**/*.mid, !**/*.mp3,
            !**/*.mpa, !**/*.ra, !**/*.wav, !**/*.wma, !**/*.3g2, !**/*.3gp, !**/*.asf, !**/*.asx,
            !**/*.avi, !**/*.flv, !**/*.mov, !**/*.mp4, !**/*.mpg, !**/*.rm, !**/*.swf, !**/*.vob,
            !**/*.wmv, !**/*.bmp, !**/*.gif, !**/*.jpg, !**/*.png, !**/*.psd, !**/*.tif, !**/*.swf,
            !**/*.jar, !**/*.zip, !**/*.rar, !**/*.exe, !**/*.dll, !**/*.pdb, !**/*.7z, !**/*.gz,
            !**/*.tar.gz, !**/*.tar, !**/*.gz, !**/*.ahtm, !**/*.ahtml, !**/*.fhtml, !**/*.hdm,
            !**/*.hdml, !**/*.hsql, !**/*.ht, !**/*.hta, !**/*.htc, !**/*.htd, !**/*.war, !**/*.ear,
            !**/*.htmls, !**/*.ihtml, !**/*.mht, !**/*.mhtm, !**/*.mhtml, !**/*.ssi, !**/*.stm,
            !**/*.bin,!**/*.lock,!**/*.svg,!**/*.obj,
            !**/*.stml, !**/*.ttml, !**/*.txn, !**/*.xhtm, !**/*.xhtml, !**/*.class, !**/*.iml, !Checkmarx/Reports/*.*,
            !OSADependencies.json, !**/node_modules/**/*''', fullScanCycle: 10, generatePdfReport: true, groupId: '53', password: '{AQAAABAAAAAQmjNhbGgdCpMZP4oyrcwv38pEN1QExKMCWZ7TLlhmstw=}', preset: '36', projectName: 'Tasks_API', sastEnabled: true, serverUrl: 'https://cxprivatecloud.checkmarx.net/', sourceEncoding: '6', useOwnServerCredentials: true, username: '', vulnerabilityThresholdResult: 'FAILURE', waitForResultsEnabled: true])
         }
      }

      stage('Test_Kiuwan') {
         when {
            branch 'dev';
         }
         steps {
            echo 'Testing Kiuwan...'
            kiuwan applicationName: 'Tasks API', connectionProfileUuid: '5PIH-WqhL', failureThreshold: 60.0, label: '00008', sourcePath: '/home/jenkins/jenkins_slave/workspace/aceTsoft_TasksAPIMultibranch_dev', unstableThreshold: 96.0
         }
      }

      stage('Test_Snyk_SCA') {
         steps {
            echo 'Testing Snyk SCA...'
            snykSecurity(
               snykInstallation: 'snyk@latest',
               snykTokenId: 'Id_Snyk_Cred',
               failOnIssues: false,
            )
         }
      }

      stage('Test_Snyk_SAST') {
         steps {
            echo 'Testing Snyk SAST...'
            snykSecurity(
               snykInstallation: 'snyk@latest',
               snykTokenId: 'Id_Snyk_Cred',
               additionalArguments: '--code',
               failOnIssues: false,
            )
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