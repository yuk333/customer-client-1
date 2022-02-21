import React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import { useParams , Link, useNavigate  } from 'react-router-dom';
import axios from 'axios';
import useAsync from '../hooks/useAsync';
import { API_URL } from '../config/constants';
function DetailCustomer() {
    const param = useParams();
    const navigate = useNavigate();
    console.log(param);
    const { id } = param;
    async function getCustomer() {
        const response = await axios.get(
            `${API_URL}/customer/${id}`
        )
        return response.data;
    }

    //삭제하기
    const onDelete = () => {
        console.log('aaaaaaaaaaa');
        axios.delete(`${API_URL}/customer/${id}`)
        .then((result)=>{
            console.log('삭제되었습니다.');
            navigate(-1)
        }).catch((err) => {
            console.log(err);
        })
    }

    
    const state = useAsync(getCustomer);
    const { loading, error, data: customer } = state;
    console.log(customer);
    if(loading) return <div>로딩중........</div>
    if(error) return <div>페이지를 나타낼수 없습니다.</div>
    if(!customer) return null;
    return (
        <div>
           <h2>고객 상세 정보</h2>
           <Table>
               <TableBody>
                   <TableRow>
                       <TableCell>고객명</TableCell>
                       <TableCell>{customer[0].c_name}</TableCell>
                   </TableRow>
                   <TableRow>
                       <TableCell>연락처</TableCell>
                       <TableCell>{customer[0].c_phone}</TableCell>
                   </TableRow>
                   <TableRow>
                       <TableCell>생년월일</TableCell>
                       <TableCell>{customer[0].c_birthday}</TableCell>
                   </TableRow>
                   <TableRow>
                       <TableCell>성별</TableCell>
                       <TableCell>{customer[0].c_gender}</TableCell>
                   </TableRow>
                   <TableRow>
                       <TableCell>주소</TableCell>
                       <TableCell>{customer[0].c_addr}</TableCell>
                   </TableRow>
               </TableBody>
           </Table>
           <button onClick={onDelete}> 삭제</button>
           <button><Link to={`/edit/${customer[0].c_no}`}>수정</Link></button>
           <button onClick={(e)=> (e.preventDefault() )}><Link to="/">리스트보기</Link></button>
        </div>
    );
}

export default DetailCustomer;