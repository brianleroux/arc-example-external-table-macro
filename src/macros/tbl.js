module.exports = async function tbl (arc, cfn, stage) {
  
  // CHANGEME! this blows open access to all tables in the account/region..
  // arn of table you need to access
  let arn = 'arn:aws:dynamodb:*:*:table/*'

  // add the custom policy to the cfn document
  cfn.Resources.MyTablePolicy = {
    Type: 'AWS::IAM::Policy',
    DependsOn: 'Role',
    Properties: {
      PolicyName: 'CustomTablePolicy',
      PolicyDocument: {
        Statement: [{
          Effect: 'Allow',
          Action: [
             'dynamodb:Query',
             'dynamodb:Scan',
          ],
          Resource: arn // you could have more than one here..
        }]
      },
      Roles: [{ Ref: 'Role' }] // attaches the policy to Role resource
    }
  }

  // return the cloudformation doc 
  return cfn
}
