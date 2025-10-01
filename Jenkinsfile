pipeline {
    agent any

    environment {
        AWS_DEFAULT_REGION = 'ap-south-1'
        ECR_REPO = '207963326787.dkr.ecr.ap-south-1.amazonaws.com/my-app'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/mrbhupendra1/ecomerce-repo.git',
                    credentialsId: 'git-credentials'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image..."
                sh 'docker build -t ecommerce-app:latest .'
            }
        }

        stage('Verify Docker Image') {
            steps {
                echo "Verifying Docker image..."
                sh 'docker images | grep ecommerce-app'
            }
        }

        stage('Push to ECR') {
            steps {
                withAWS(credentials: 'aws-credentials', region: "${AWS_DEFAULT_REGION}") {
                    sh '''
                        echo "Logging in to AWS ECR..."
                        aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $ECR_REPO

                        echo "Tagging image for ECR..."
                        docker tag ecommerce-app:latest $ECR_REPO:latest

                        echo "Pushing image to ECR..."
                        docker push $ECR_REPO:latest
                    '''
                }
            }
        }
    }
}
