function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    if(String(expr).includes('(',0)||String(expr).includes(')',0)){
        const config1 = [['(', ')']];
        let isFound = false;
    let arr = [];
    let config = config1;
    let str = String(expr);
    for(let i = 0; i<String(str).length; i++)
    {
        isFound = false;
        for(let j = 0; j<config.length; j++)
        {
            if(isFound==false)
            {
                for(let k = 0; k<2; k++)
                {
                    if(str[i] == config[j][k])
                    {
                        isFound = true;
                        if(config[j][0]==config[j][1])
                        {
                            if(arr.length!=0 && arr[arr.length-1]==str[i])
                            {
                                arr.pop();
                                break;
                            }
                            else if((arr.length!=0 && arr[arr.length-1]!=str[i]) || arr.length==0)
                            {
                                arr.push(str[i]);
                                break;
                            }
                        }                    
                        else if(k == 0)
                        {
                            arr.push(str[i]);
                            break;
                        }
                        else if(k == 1)
                        {
                            if(arr.length!=0 && arr[arr.length-1]==config[j][0])
                            {
                                arr.pop();
                                break;
                            }
                            else if(arr.length==0)
                            {
                                throw "ExpressionError: Brackets must be paired";
                            }
                        }
                    }
                }
            }
            else
            {
                break;
            }
        }   
    }
    if(arr.length!=0)
    {
        throw "ExpressionError: Brackets must be paired";
    }
    }

    let buf = String(expr).split(' ');
    if(String(expr).includes(' ')==false){
        buf = "";
        for(let i = 0; i<String(expr).length-1; i++){
            buf += String(expr)[i];
            if(!isNaN(String(expr)[i])&&isNaN(String(expr)[i+1])){
                buf += ' ' + String(expr)[i+1] + ' ';
                i++;
            }
        }
        buf += String(expr)[String(expr.length-1)];
        buf = buf.split(' ');
    }
    let inExpr = [];
    for(let i = 0, k = 0; i<buf.length; i++){
        if(buf[i]!=""){
            inExpr[k] = buf[i];
            k++;
        }
    }
    let prefixStack = [];
    let prefixExpr = [];
    for(let i = 0; i<inExpr.length; i++){
        if(inExpr[i]=='+'||inExpr[i]=='-'||inExpr[i]=='*'||inExpr[i]=='/'){
            if(prefixStack.length==0||prefixStack[0]=='('){
                prefixStack.unshift(inExpr[i]);
            }
            else if(prefixStack.length!=0&&((inExpr[i]=='*'||inExpr[i]=='/')&&(prefixStack[0]=='-'||prefixStack[0]=='+'))){
                prefixStack.unshift(inExpr[i]);
            }
            else {
                while(prefixStack.length!=0){
                    prefixExpr.push(prefixStack.shift());
                    if(prefixStack.length>0&&((prefixStack[0]=='(')||((inExpr[i]=='*'||inExpr[i]=='/')&&(prefixStack[0]=='+'||prefixStack[0]=='-')))){
                        break;
                    }
                }
                prefixStack.unshift(inExpr[i]);
            }
        }
        else if(inExpr[i]=='('){
            prefixStack.unshift(inExpr[i]);
        }
        else if(inExpr[i]==')'){
            while(prefixStack.length!=0){
                prefixExpr.push(prefixStack.shift());
                if(prefixStack[0]=='('){
                    prefixStack.shift();
                    break;
                }
            }
        }
        else{
            prefixExpr.push(inExpr[i]);
        }
    }
    while(prefixStack.length!=0){
        prefixExpr.push(prefixStack.shift());
    }
    prefixStack.length = 0;
    let result = 0;
    for(let i = 0; i<prefixExpr.length; i++){
        if(!isNaN(prefixExpr[i])){
            prefixStack.unshift(prefixExpr[i]);
        }
        else{
            let num1 = prefixStack.shift();
            let num2 = prefixStack.shift();
            switch (prefixExpr[i]) {
                case '+':
                    result = +num1 + +num2;
                    break;
                case '-':
                    result = +num2 - +num1;
                    break;
                case '*':
                    result = +num1 * +num2;
                    break;
                case '/':
                    if(+num1==0){
                        throw "TypeError: Division by zero.";
                    }
                    result = +num2 / +num1;
                    break;
            
                default:
                    break;
            }
            prefixStack.unshift(result);
        }
    }
    return prefixStack.pop();
}

module.exports = {
    expressionCalculator
}