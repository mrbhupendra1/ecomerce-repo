pipeline {
    agent any

    environment {
        AWS_REGION     = "ap-south-1"
        AWS_ACCOUNT_ID = "207963326787"
        ECR_REPO       = "my-ecommerce-app"
        IMAGE_NAME     = "my-ecommerce-app"
        IMAGE_TAG      = "build-5"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/mrbhupendra1/ecomerce-repo.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                }
            }
        }

        stage('Login to ECR') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', 
                                  credentialsId: 'aws-creds']]) {
                    sh '''
                        echo "Logging in to ECR..."
                        aws ecr get-login-password --region $AWS_REGION | \
                        docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com
                    '''
                }
            }
        }

        stage('Tag & Push Image to ECR') {
            steps {
                script {
                    sh '''
                        echo "Tagging image..."
                        docker tag ${IMAGE_NAME}:${IMAGE_TAG} $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO:${IMAGE_TAG}

                        echo "Pushing image..."
                        docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO:${IMAGE_TAG}
                    '''
                }
            }
        }

        stage('Deploy to Server-02') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', 
                                  credentialsId: 'aws-creds']]) {
                    sshagent (credentials: ['server02-ssh']) {
                        sh '''
                            echo "Deploying to Server-02..."
                            ssh -o StrictHostKeyChecking=no ubuntu@13.233.154.171 "
                                export AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID &&
                                export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY &&
                                export AWS_DEFAULT_REGION=$AWS_REGION &&
                                aws ecr get-login-password --region $AWS_REGION | sudo docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com &&
                                sudo docker pull $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO:${IMAGE_TAG} &&
                                sudo docker stop ${IMAGE_NAME} || true &&
                                sudo docker rm ${IMAGE_NAME} || true &&
                                sudo docker run -d --name ${IMAGE_NAME} -p 3000:3000 $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO:${IMAGE_TAG}
                            "
                        '''
                    }
                }
            }
        }
    }
}
