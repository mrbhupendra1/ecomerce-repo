pipeline {
    agent any

    environment {
        IMAGE_NAME = "my-app"
        IMAGE_TAG  = "latest"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/mrbhupendra1/ecomerce-repo.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG .'
            }
        }

        stage('Verify Image') {
            steps {
                sh 'docker images | grep $IMAGE_NAME'
            }
        }
    }
}
