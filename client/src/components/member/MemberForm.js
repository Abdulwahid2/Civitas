import { useState } from "react"
import './form.css';
import * as  AiIcons from 'react-icons/ai';
import * as  SiIcons from 'react-icons/si';
import * as  RiIcons from 'react-icons/ri';

const MemberForm = ({onMemberFormClick, trigger, setTrigger}) => {
    let [firstName, setFirstName] = useState("")
    let [lastName, setLastName] = useState("")
    let [address1, setAddress1] = useState("")
    let [address2, setAddress2] = useState("")
    let [city, setCity] = useState("")
    let [province, setProvince] = useState("")
    let [postalCode, setPostalCode] = useState("")
    let [contactNumber, setContactNumber] = useState([])
    let [emailAddress, setEmailAddress] = useState("")
    let [active, setActive] = useState("true")
    let [createError, setCreateError] = useState("")

    async function onCreateClicked(e) {
        let currentDate = new Date()

        let memberToCreate = {
            firstName, 
            lastName, 
            address1,
            address2,
            city,
            province,
            postalCode,
            contactNumber,
            emailAddress,
            active,
            memberSince : currentDate,
            renewalDate : currentDate,
            lastUpdateDate : currentDate
        }
        console.log('Creating Member with', memberToCreate )
        try {
            let createResponse = await fetch('/member', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(memberToCreate)
            })

            if (createResponse.status === 200) {
                onMemberFormClick("Success");

                //temporary    
                setFirstName("");
                setLastName("");
                setAddress1("");
                setAddress2("");
                setCity("");
                setProvince("");
                setPostalCode("");
                setContactNumber([]);
                setEmailAddress("");
                setActive("true");
            }
            // the server didn't like the data for some reason
            console.log('Create response is', createResponse)
            if (createResponse.status !== 200) {
                let errorMessage = await createResponse.text()
                console.log('We had an error.  it was: ', errorMessage)
                setCreateError(errorMessage)
            }
            else {
                setCreateError(undefined)
            }
        }
        catch (error) {
            // the server cannot be reached
            console.error('Fetch failed to reach the server.')
        }
    }

    const onInputChange = (event, setFunction) => {
        console.log('Changing input to be ', event.target.value)
        setFunction(event.target.value);
    };

    const onContactNumberChange = (e, i) => {
        let newContactNumber = [...contactNumber]
        newContactNumber[i][e.target.name] = e.target.value 
        setContactNumber(newContactNumber); 
      }  
  
    const onContactNumberAdd = () =>  {      
        let newContactNumber = [...contactNumber]
        newContactNumber.push({name: "",  phoneNumber: ""})
        setContactNumber(newContactNumber);
    }

    const onContactNumberDelete = (index) => {
        let newContactNumber = [...contactNumber];
        newContactNumber.splice(index, 1);
        setContactNumber(newContactNumber);
    }

    const onClickAdd = ()=>{
        onCreateClicked();
        setTrigger(false);   
    }

    let createMemberDataInvalid = !emailAddress || (emailAddress.trim().length === 0)

    return (trigger)? (
        <div className='createform'>
            <div className="popup-in">
                <h4>Add a New Member</h4>
                <button className="closebtn" onClick={()=>setTrigger(false)}><AiIcons.AiOutlineClose/></button>

                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input id="firstName" value={firstName} onChange={(event) => onInputChange(event,setFirstName)}/>
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input id="lastName" value={lastName} onChange={(event) => onInputChange(event,setLastName)}/>
                </div>
                <div>
                    <label htmlFor="address1">Address1:</label>
                    <input id="address1" value={address1} onChange={(event) => onInputChange(event,setAddress1)}/>
                </div>
                <div>
                    <label htmlFor="address2">Address2:</label>
                    <input id="address2" value={address2} onChange={(event) => onInputChange(event,setAddress2)}/>
                </div>
                <div className="row">
                    <div className="col3">
                        <label htmlFor="city">City:</label>
                        <input id="city" value={city} onChange={(event) => onInputChange(event,setCity)}/>
                    </div>
                    <div className="col3">
                        <label htmlFor="province">Province:</label>
                        <input id="province" value={province} onChange={(event) => onInputChange(event,setProvince)}/>
                    </div>
                    <div className="col3">
                        <label htmlFor="postalCode">Postal Code:</label>
                        <input id="postalCode" value={postalCode} onChange={(event) => onInputChange(event,setPostalCode)}/>
                    </div>
                </div>

                <div className="row">
                    <div>
                        <label htmlFor="contactNumber">Contact Number:</label>
                
                        <table>                      
                            <tbody>
                                {
                                    contactNumber.map( (cn, index) => { 
                                        return ( <tr key={index}>                          
                                                    <td>{
                                                        <input name="name" value={cn.name} placeholder="Type"
                                                        onChange={ (e) => onContactNumberChange(e, index) }
                                                        />
                                                    }</td>
                                                    <td>{
                                                        <input name="phoneNumber" value={cn.phoneNumber} placeholder="Phone #"
                                                        onChange={ (e) => onContactNumberChange(e, index) }
                                                        />
                                                    }</td>
                                                    {   
                                                    <td>                            
                                                        <button className="clear" onClick={ () => onContactNumberDelete(index) }><RiIcons.RiDeleteBinFill/></button>
                                                    </td>
                                                    }            
                                                </tr> )
                                    })
                                }
                                <tr>                                
                                    <td>
                                    <button onClick={ onContactNumberAdd }><SiIcons.SiAddthis/></button>
                                    </td>
                                </tr>
                            </tbody>    
                        </table>            
                    </div> 
                </div>            

                <div>
                    <label htmlFor="emailAddress">Email Address:</label>
                    <input id="emailAddress" value={emailAddress} onChange={(event) => onInputChange(event,setEmailAddress)}/>
                </div>
                <div>
                    <label htmlFor="active">Active:</label>                
                    <select value={active} onChange={(event) => onInputChange(event, setActive)}>
                    <option value="true">true</option>
                    <option value="false">false</option>
                    </select>
                </div>
                <br/>            
                <button disabled={ createMemberDataInvalid } onClick={ onClickAdd }>Add Member</button>
                { createError && <div>{createError}</div> }  
            </div>          
        </div>
    ):"";
}

export default MemberForm