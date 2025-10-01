pipeline {
  agent any
  parameters {
    string(name: 'REGISTRY', defaultValue: '', description: 'Docker registry (leave empty to skip push)')
    string(name: 'IMAGE_NAME', defaultValue: 'my-ecommerce-app', description: 'Image name')
  }
  stages {
    stage('Checkout') {
      steps { checkout scm }
    }
    stage('Build image') {
      steps {
        sh 'docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} .'
      }
    }
    stage('Push') {
      when { expression { return params.REGISTRY != '' } }
      steps {
        withCredentials([usernamePassword(credentialsId: 'docker-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh '''
            echo "$DOCKER_PASS" | docker login ${REGISTRY} -u "$DOCKER_USER" --password-stdin
            docker tag ${IMAGE_NAME}:${BUILD_NUMBER} ${REGISTRY}/${IMAGE_NAME}:${BUILD_NUMBER}
            docker push ${REGISTRY}/${IMAGE_NAME}:${BUILD_NUMBER}
          '''
        }
      }
    }
  }
}

