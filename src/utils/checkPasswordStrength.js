import zxcvbn from "zxcvbn"

export default (password) => {
    const result = zxcvbn(password);

    
    return {
        score: result.score, 
        feedback: result.feedback.suggestions, 
    };
};

