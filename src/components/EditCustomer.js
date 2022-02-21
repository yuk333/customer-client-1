import React,{ useState  } from 'react';
import { useParams , Link, useNavigate  } from 'react-router-dom';
import axios from 'axios';
import { Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import useAsync from '../hooks/useAsync';
import { API_URL } from '../config/constants';
function EditCustomer() {
    const param = useParams();
    const navigate = useNavigate();
    const [ gender, setGender ] = useState("");
    console.log(gender);
    const onChange = (e) => {
        customer[0].c_gender = e.target.value;
        setGender(e.target.value);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        // console.log(e.target.c_name.value);
        insertCustomer(e.target);   
    }
    console.log(param);
    const { id } = param;
    //put전송 axios
    function insertCustomer(form){
        axios.put(`${API_URL}/editCustomer/${id}`,{
            c_name:form.c_name.value,
            c_phone:form.c_phone.value,
            c_birthday:form.c_birthday.value,
            c_gender:form.c_gender.value,
            c_addr:form.c_addr.value,
        })
        .then(function(res){
            console.log(res);
            navigate(-1);
        }).catch(function(err){
            console.log(err);
        })
    }
    async function getCustomer() {
        const response = await axios.get(
            `${API_URL}/customer/${id}`
        )
        return response.data;
    }
    const datastate = useAsync(getCustomer);
    const { loading, error, data: customer } = datastate;
   
    if(loading) return <div>로딩중........</div>;
    if(error) return <div>페이지를 나타낼수 없습니다.</div>;
    if(!customer) return null;
    
    return (
        
        <form onSubmit={onSubmit}>
        <div>
             <h2>고객 상세 정보</h2>
            
           <Table>
               <TableBody>
                   <TableRow>
                       <TableCell>고객명</TableCell>
                       <TableCell><input name="c_name"  defaultValue={customer[0].c_name}  /></TableCell>
                   </TableRow>
                   <TableRow>
                       <TableCell>연락처</TableCell>
                       <TableCell><input name="c_phone"  defaultValue={customer[0].c_phone}   /></TableCell>
                   </TableRow>
                   <TableRow>
                       <TableCell>생년월일</TableCell>
                       <TableCell><input name="c_birthday"  type="text" defaultValue={customer[0].c_birthday}  /></TableCell>
                   </TableRow>
                   <TableRow>
                       <TableCell>성별</TableCell>
                       <TableCell>여성
                           <input name="c_gender"  checked={customer[0].c_gender === '여성' ? true : false } value="여성" type="radio" onChange={onChange}/>
                        남성<input name="c_gender" checked={customer[0].c_gender === '남성' ? true: false } value="남성" type="radio" onChange={onChange}/> </TableCell>
                   </TableRow>
                   <TableRow>
                       <TableCell>주소</TableCell>
                       <TableCell><input name="c_addr"  defaultValue={customer[0].c_addr}  /></TableCell>
                   </TableRow>
               </TableBody>
           </Table>
           <br/>
           <button type="submit"> 수정</button>
           <button onClick={(e)=> (e.preventDefault() )}><Link to="/">리스트보기</Link></button>
        </div>
        </form>
    );
}

export default EditCustomer;