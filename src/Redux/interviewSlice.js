import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  candidates: {}, 
  currentCandidateId: null,
  interviewStatus: 'pending-resume', 
  candidateInfo:{
    name:'',
    email:'',
    phone:''
  },
  currentQuestionIndex: 0,
  questions: [],
  answers: [],
  timer: 0,
};

const interviewSlice=createSlice({
    name:"interview",
    initialState,
    reducers:{

        confirmCandidateInfo:(state,action)=>{
            state.candidateInfo=action.payload
            state.interviewStatus='ready-to-start'
        },

        setParsedInfo:(state,action)=>{
            state.candidateInfo=action.payload

            const {name,email,phone}=action.payload;

            if(!name ||!email ||!phone){
                state.interviewStatus='info-gathering'
            }else{
                const id= nanoid()
                state.candidates[id]={id,...action.payload,score:0,summary:'',answers:[]}
                state.currentCandidateId=id,
                state.interviewStatus='ready-to-start'
            }
        },

        updateCandidateInfo:(state,action)=>{
            state.candidateInfo={...state.candidateInfo,...action.payload};
        },

        startInterview:(state,action)=>{
            const {name,email,phone}=action.payload;
            if(name && email && phone){
                const id=nanoid();
                candidates[id]={id,name, email, phone, score: 0, summary: '', answers: []}
                state.currentCandidateId=id
                state.interviewStatus='in-progress'
                state.currentQuestionIndex=0
                state.answers=[]
            }
            else{
                state.interviewStatus = 'info-gathering';
            }
        },
        resetInterview:(state,action)=>{
            Object.assign(state,{...initialState,candidates:state.candidates});
        }
    }
})

export const {startInterview,confirmCandidateInfo,resetInterview,setParsedInfo,updateCandidateInfo}=interviewSlice.actions
export default interviewSlice.reducer