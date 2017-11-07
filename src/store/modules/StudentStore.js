import axios from 'axios'
import vue from 'vue'

vue.use(axios);
axios.defaults.baseURL='http://127.0.0.1:3000';
export default {
	state:{
		students:[]
	},
	getters:{
	    students:(state)=>{
	    	return state.students
	    }
	},
	mutations:{
		alterStudents:(state,val)=>{
			state.students = val;
		}
	},
	actions:{
		findAllStudent:(context)=>{
			axios.get('/student/findAll').then(function({data}){
				context.commit('alterStudents',data);
			});
		},
		batchDeleteStudent:(context,data)=>{
			return new Promise(function(resolve,reject){
				axios.post('/student/batchDelete',data).then(function(result){
					context.dispatch('findAllStudent');
					resolve(result);
				}).catch(function(error){
					reject(error);
				});
			});
		},
		updateStudent:(context,data)=>{
			return new Promise(function(resolve,reject){
				axios.post('/student/update',data).then(function(result){
					context.dispatch('findAllStudent');
					resolve(result);
				}).catch(function(error){
					reject(error);
				});
			});
		},
		saveStudent:(context,data)=>{
			return new Promise(function(resolve,reject){
				axios.post('/student/save',data).then(function(result){
					context.dispatch('findAllStudent');
					resolve(result);
				}).catch(function(error){
					reject(error);
				});
			});
		},
		toSearch:(context,keys)=>{
			return new Promise(function(resolve,reject){
				axios.get('/student/query/'+keys).then(function({data}){
					//console.log(data);
					resolve(data);
					context.commit('alterStudents',data);
				}).catch(function(error){
					reject(error);
				});
			});
		}
	}
}