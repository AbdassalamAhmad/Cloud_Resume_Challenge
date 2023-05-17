## Project Architecture
![Project Architecture](https://github.com/AbdassalamAhmad/Cloud_Resume_Challenge/assets/83673888/d24becc1-ff6a-454e-b60f-230069c1c610)


## Assume Role Security [Important Note]
- I've used OIDC instead of putting my AWS Credentials in the Github Workflow secrets.
- I was folowing this [tutorial](https://cloudscalr.com/deploy-to-aws-with-terraform-within-a-github-action) to implement this additional security.
- when creating the Idp manually in the new UI, it didn't allow me to edit the policy until after creation.
#### Very Importnat Note
- If you didn't edit that policy anyone who knows your role name and your account ID will can mess up with your AWS account depending on the level of access you gave to the role.
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
