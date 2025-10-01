pipeline {
    agent any

    environment {
        IMAGE_NAME = "ecommerce-app"
        IMAGE_TAG  = "build-${BUILD_NUMBER}"
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
                sh '''
                echo "Building Docker image..."
                docker build -t $IMAGE_NAME:$IMAGE_TAG .
                '''
            }
        }

        stage('Verify Docker Image') {
            steps {
                sh "docker images | grep $IMAGE_NAME"
            }
        }
    }
}
