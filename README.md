# AWS CodePipeline - S3 Static Website Deployment

Automated CI/CD deployment of a React application using AWS CodePipeline, CodeBuild, and S3 static website hosting.

**Live Demo:** http://reeact-tudo-app.s3-website.eu-north-1.amazonaws.com/

---

## Architecture

```
GitHub → CodePipeline → CodeBuild → S3 → Live Website
```

- **Source:** GitHub repository
- **Build:** AWS CodeBuild
- **Deploy:** Amazon S3 static hosting

---

## Pipeline Workflow

![Pipeline Dashboard](../todo-evaluation-app/src/assets/codepipeline.png)

### 1. Source Stage

CodePipeline detects GitHub repository changes and pulls the latest code.

### 2. Build Stage

CodeBuild runs `npm install` and `npm run build` to create production files.

### 3. Deploy Stage

Built artifacts are deployed to S3 bucket for static website hosting.

---

## Configuration

### buildspec.yml

```yaml
version: 0.2

phases:
  install:
    commands:
      - npm install
  build:
    commands:
      - npm run build
artifacts:
  files:
    - "**/*"
  base-directory: dist
```

---

## Setup Steps

1. **Create S3 bucket** and enable static website hosting
2. **Create CodeBuild project** linked to GitHub repository
3. **Create CodePipeline** with Source (GitHub), Build (CodeBuild), and Deploy (S3) stages
4. **Push code** to trigger automatic deployment

---

## Results

✅ Automated CI/CD pipeline  
✅ Zero-downtime deployments  
✅ Fast deployment cycle  
✅ Cost-effective S3 hosting
