# Wysa-assessment

routes 

post("/") - to register 
put("/secondPage/:userName") - to jump to second page 
put("/thirdPage/:userName") - to jump to third page 
put("/fourthPage/:userName") - to jump to fourth page 
put("/fifthPage/:userName") - to jump to fifth page 
put("/sixthPage/:userName") - to jump to sixth page 

LeetCode Challenge Ans- validate Binary Search Tree
class Solution {
public:
    void f(TreeNode *root,bool &t){
        if(root==NULL)return;
        if(root->val>root->left->val){
            root=root->left;
        }
        else{
             t=false;
        }
        if(root->val<root->right->val){
            root=root->right;
        }
        else{
             t=false;
        }
        
    }
    bool isValidBST(TreeNode* root) {
        bool t;
        f(root,t);
        return t;
        
    }
};
