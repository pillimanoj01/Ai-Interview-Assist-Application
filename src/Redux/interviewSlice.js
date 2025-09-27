import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  candidates: {}, 
  currentCandidateId: null,
  interviewStatus: 'not-started', 
  currentQuestionIndex: 0,
  questions: [],
  answers: [],
  timer: 0,
};

const interviewSlice=createSlice({
    name:"interview",
    initialState,
    reducers:{
        startInterview:(state,action)=>{
            const {name,email,phone}=action.payload;
            const id=nanoid();
            candidates[id]={id,name, email, phone, score: 0, summary: '', answers: []}
            state.currentCandidateId=id
            state.interviewStatus='in-progress'
            state.currentQuestionIndex=0
            state.answers=[]
        },
        resetInterview:(state,action)=>{
            Object.assign(state,initialState);
        }
    }
})

export const {startInterview,resetInterview}=interviewSlice.actions
export default interviewSlice.reducer