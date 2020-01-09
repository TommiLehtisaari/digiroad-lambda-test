// Serverless framework uses webpack within to compile lambdafunctions.
// That leads to severall problems:
//    1:  __directory -variable confiqures differently in build and execute runtimes.
//    2: import doesn't work for exoticfiles like .sql. (it needs own loaders)
//   this all can be confiqured in webpack.conf-file but since using serverless framework
// that file is consiled within dependencies. It would be bigger problem to configure
// this than to use just string-value. However this should not be permanent.
// Feel free to fix the issue.
export default `
UPDATE datasets 
SET status_log='matching_script executed'
WHERE dataset_id = $1;
`;
