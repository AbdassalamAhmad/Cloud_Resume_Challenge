# Cloud_Resume_Challenge

The [Cloud Resume Challenge](https://cloudresumechallenge.dev/docs/the-challenge/aws/) was created by [Forrest Brazeal](https://forrestbrazeal.com/) as a self-guided, hands-on project to incorporate a large range of skills used by DevOps Engineers and Cloud Developers.

The challenge is designed to champion *self-learning* as it intentionally gives only high-level guidance on how to research, navigate, and implement core topics such as DNS, APIs, Testing, Infrastructure-as-Code, and CI/CD pipelines.

</br>

## Project Architecture
![Project Architecture](https://github.com/AbdassalamAhmad/Cloud_Resume_Challenge/assets/83673888/d24becc1-ff6a-454e-b60f-230069c1c610)


## Project Workflow Summary
### User Perspective
- The user request the cloud resume at [abdassalam.dev](https://abdassalam.dev) or [www.abdassalam.dev](https://www.abdassalam.dev) and will be redirected to [abdassalam.dev](https://abdassalam.dev).
- Route53 will route the traffic to CloudFront distributaion.
- CloudFront will serve the cached content from S3 bucket.
- ACM (Amazon Certificate Manager) provide SSL certificate to CloudFront (https).
- Number of visitors is stored in DynamoDB table and retrieved and updated by Lambda function that is invoked by API Gateway.
- Google Analytics is used to provide key insights about visitors location and number of vistors per minute.
### Developer Perspective
- The developer will push the code to GitHub.
- A GitHub Action Workflow will be run.
- It will push new content to S3 and Invalidate CloudFront cache.
- It also modify the infrastructure using terraform.


## Challenge Steps:
1. **Pass AWS Certification:**
- Passed AWS Cloud Practitioner Exam on  December 2022. Verify using [Credly](https://www.credly.com/badges/4e10de09-a9ff-462c-aff6-a7c6c0bacf82)
2. **HTML & 3. CSS:**
- I got A CV template written in plain HTML & CSS and modified it to meet my needs.
4. **Static Website:**
- Created an S3 Bucket, enabled static hosting, versioning and allow public access.
5. **HTTPS:**
- Used ACM (Amazon Certificate Manager) to issue an SSL certificate for the domain and all subdomains and attach it to CloudFront.
- Utilized CloudFront to cache the S3 content and serve people from all over the world faster.
- Redirect HTTP to HTTPS.
6. **DNS:**
- I bought a custom domain name called [abdassalam.dev](https://abdassalam.dev)
- Created an A record that direct traffic from abdassalam.dev to CloudFront distribution.
- Created a CNAME record that redirect users from www.abdassalam.dev to abdassalam.dev
- Created another CNAME record for the certificate.
- Created MX and TXT records to forward emails from devops@abdassalam.dev to my gmail.
7. **JavaScript:**
- Wrote a simple async function that perform a GET request to retrieve data from an API.
- If the APT return status code of 200, then display the number of visitors.
8. **Database:**
- Created a simple DynamoDB Table that has two attributes {ID(primary Key), Visitors_Count}
- The reason for ID is to be able to retreive the visitors count from a querey of ID = 1.
9. **API Gateway:**
- Used HTTP API to Invoke Lambda function and get back a JSON response to the website.
- Configured GET (GetVisitorsCount) to trigger lambda and OPTIONS (/{proxy+}) route to solve CORS issue of preflight.
10. **Lambda Function:**
- Used Boto3 libraray (AWS SDK for python) to make API call to the DynamoDB and update the visitors count.
- It has two sections, one to respond to /{proxy+} to solve CORS and the other one is the main one to connect with DynamoDB and return the vistors count alongside the status code.
11. **Python Tests:**
- [TO-DO]
12. **Terraform IaC:**
- [TO-DO]
13. **Git and GitHub:**
- Created a GitHub repo to host and version the code, infrastructure and CI/CD Pipelines.
14. **Backend CI/CD:**
- [TO-DO]
15. **Frontend CI/CD:**
- Build a GitHub Actions CI/CD Workflow that will sync the website code with s3 bucket.
- Invalidate CloudFront cache to make the new changes immediately.
- configured GitHub Actions as trusted identity provider with AWS, utilizing OpenID Connect token-based authentication for short-lived credentials. *look at the last section for more details on this*
16. **Blog Post:**
- [TO-DO]


## GitHub Actions as trusted identity provider [Important]
- I've used OpenID Connect (OIDC) instead of putting my AWS Credentials in the Github Workflow secrets.
- I was folowing this [tutorial](https://cloudscalr.com/deploy-to-aws-with-terraform-within-a-github-action) to implement this additional security.
- when creating the Idp manually in the new UI, it didn't allow me to edit the policy until after creation.
#### Very Importnat Note
- If you didn't edit that policy anyone who knows your role name and your account ID can mess up with your AWS account depending on the level of access you gave to the role.
#### Solution:
- Add this line to the idb
```json
"StringLike": {
    "token.actions.githubusercontent.com:sub": "repo:octo-org/octo-repo:*"
},
```
> refer to this [url](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services) and this [url](https://github.com/aws-actions/configure-aws-credentials) to learn more on how to implement this type of security.

#### proof of security risk
- I've tried creating a simple repo in other account before editing that identity, and managed to do everything that was allowed by that role.
- I've configured my git credentials to use the second account to be able to push code to the other repo.
- go to `Control Panel\User Accounts\Credential Manager` and choose windows credentials and remove git:https://github.com and then try to push the code, you will be prombted to authenticate with your other github account again.
![image](https://github.com/AbdassalamAhmad/Cloud_Resume_Challenge/assets/83673888/bcd3e60b-55c1-4db4-9479-60c41e2a9ae6)
