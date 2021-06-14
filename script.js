var myArray = [
    "hello there my friend robert",
    "bb gnhgn",
    "hello there friend kimberly",
    "hello friend claire",
    "hi there friend chris"
];
function prepareArray(arr){
    let res = [];
  
    arr.forEach((element) => {
        console.log(element.split(" "));
        res.push(element.split(" "));
    });
   
    return res;
}
function calcWordsWeights(splitedArr){
   let res = [];
   let searchMask = new Array(splitedArr.length).fill(1);
  
   for(let i=0;i<getMaxLength(splitedArr);i++){
        splitedArr.forEach((elem,index)=>{
           
            if(searchMask[index]==true){
            if(res.length <= i){
                res[i]=[];
               
            }
            let isAdded=false;
            if(res[i].length<=0){
                res[i].push({word:elem[i],weight:0});
               
            }else{
                res[i].forEach(e=>{
                    if(e.word == elem[i]){
                        e.weight=e.weight+1;  
                        isAdded=true;  
                    }
                    
                });
                if(!isAdded){
                    res[i].push({word:elem[i],weight:0});
                }
            }
        
           
        }
        });
        if(res[i]==undefined){
            break;
        }else{
            res[i].forEach(el=>{
                if(el.weight==0){
                    for(let index in splitedArr){
                        if(splitedArr[index][i]==el.word){
                            searchMask[index]=0;
                        }
                    }
                }
            });
        }
     
     
        
   }
   console.log(res);
   return res;
}
function regenerateUniqueSentences(resArr){
    console.log(resArr);
    let numOfUniqueSentences=0; 
     resArr[0].forEach(el=>{
        numOfUniqueSentences += el.weight+1;
    });

    const finalRes =[];
   
  
    resArr.forEach((el,index)=>{
        let counter =0;
        
        el.forEach(e=>{
            for(let x=0;x<= e.weight;x++){
                if(index==0){
                    finalRes.push({txt:e.word,isDone:(e.weight==0?true:false)});
                }else{
                    if(!finalRes[counter].isDone){
                        finalRes[counter].txt += " "+ e.word;
                    }
                } 
                counter++;  
            }
        });
    });
   return finalRes;
}
function checkForExistingWord(resArr,word){
    let isExist =false;
    resArr.forEach(elem=>{
        if(elem.word == undefined  ){
            return false;
        }else if(elem.word == word){
            return true;
        }
    })
}
function getMaxLength(arr){
    let max=0;
    arr.forEach((element)=>{
        if(max < element.length)
            max= element.length;
    });
    return max
}
function stopSearchInArray(arr,word,weight){

}
(function(){
    const splitedArr = prepareArray(myArray);
    const weigthedArr =calcWordsWeights(splitedArr);
    console.log(regenerateUniqueSentences(weigthedArr));
})();
