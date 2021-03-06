import React,{useEffect,useState} from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header/Header'
import {createUser,updateUser,deleteUserAcount} from "../../api/userApi"
import {userAuth,getUser} from "../../services/auth.service"
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setUserData,updateUserData,deleteUser} from "../../store/actions/actions";
import "./About.css"

interface IAboutProps {
    auth:any
}

const About: React.FunctionComponent<IAboutProps> = (props:any) => {
    const [user,setUser] = useState<any>('')
    const [name,setName] = useState<any>('')
    const [email,setEmail] = useState<any>('')
    const [id,setId] = useState<any>('')
    const [nickname,setNickname] = useState<any>('')
    const [family_name,setFamilyName] = useState<any>('')
    const [update,setUpdate] = useState<boolean>(false)

    const history = useHistory()
    useEffect(()=>{
        if(!props.userInf.isAuth){
            props.auth.getProfile((profile:any)=>{
                setUser(profile)
                const {email,nickname,name,family_name} = profile        
                userAuth(profile).then((res:any)=> res ? 
                    getUser(email).then((res:any) => 
                        res.status!==404 ?
                            showObject(res):
                            createUser({email,nickname,name,family_name})).then(res=>{
                                if(res === undefined){
                                    console.log("error")
                                }else{
                                    showObject(res.data)
                                }
                            })
                
                
                : history.push('/verified'))
    
            })
        }else{
            showObject(props.userInf,true)
        }
    },[])

    const showObject = (obg:any,idd:boolean = false)=>{
        let userId
        if(idd){
            setId(obg.id)
            userId=obg.id
        }else{
            setId(obg._id)
            userId=obg._id
        }
    
        setName(obg.name)
        setEmail(obg.email)
        setNickname(obg.nickname)
        setFamilyName(obg.family_name)
      
        let user = {name:obg.name,email:obg.email,nickname:obg.nickname,family_name:obg.family_name,id:userId}
        props.setUserData(user)
    }
    const saveUpdates = () => {
        updateUser({id,name,nickname,family_name}).then((res:any)=>
            res.name ? 
            props.updateUserData({name:res.name,family_name:res.family_name,nickname:res.nickname})
            :console.log('error')
        ).then(()=>setUpdate(false))
    }    
    const canselUpdates = () => {
        setName(props.userInf.name)
        setNickname(props.userInf.nickname)
        setFamilyName(props.userInf.family_name)
        setUpdate(false)
    }
    const deleteAcount = () =>{
        deleteUserAcount(id)
        .then((status)=>{
            status===200?props.deleteUser():console.log("error")
        })
        .then(()=>{
            props.auth.logout()
        })
    }
    return (

        //Start ---------------

        <div>
            <Header auth={props.auth}/>
            <div className='wrapper_about'> 
                <div className='about-container'>
                    <div>
                        <p className='title'>Your Account</p>
                        <p className='user-value'>Name -- {name}</p>
                        {update ? <input className='user-value_input' value={name} name="name" onChange={(e:any)=> setName(e.target.value)}/>:<></>}
                        <p className='user-value'>Surname -- {family_name}</p>
                        {update ? <input className='user-value_input' value={family_name} name="family_name" onChange={(e:any)=> setFamilyName(e.target.value)}/>:<></>}
                        <p className='user-value'>Nickname -- {nickname} users can find you</p>
                        {update ? <input className='user-value_input' value={nickname} name="nickname" onChange={(e:any)=> setNickname(e.target.value)}/>:<></>}
                        { update ? <><br/><button className='btn btn--save' onClick={saveUpdates}>Save</button>
                                <button className='btn btn--cansel' onClick={canselUpdates}>Cancel</button></>
                            : <button className='btn btn--update' onClick={()=> setUpdate(true)}>Update</button> }
                    </div>
                    <div className='delete-container'>
                        <p className='sub-title'>Danger Zone</p>
                        <button  className='btn btn--delete' onClick={deleteAcount}>DELETE ACOUNT</button> 
                    </div>
                      
                </div>
            </div>
            
        </div>

        //End -----------
    )
};

const mapStateToProps = ( state:{user:any} ) => {
    return {
        userInf:state.user
    }
};
const mapDispatchToProps = (dispatch:any) => {
    return {
        dispatch,
        ...bindActionCreators({
           setUserData,
           updateUserData,
           deleteUser
        }, dispatch)
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(About);
