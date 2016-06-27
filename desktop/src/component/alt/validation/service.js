define([

], function(){
    alt.validation = alt.validation || {};
    alt.validation["max_length"] = function(str, maxlen){
        return (str + "").length < maxlen;
    };
});