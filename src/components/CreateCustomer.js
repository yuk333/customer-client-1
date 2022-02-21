import React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config/constants';
import PopupDom from './PopupDom';
import PopupPostCode from './PopupPostCode';
function CreateCustomer() {
    //우편번호 관리하기
    const onAddData = (data) => {
        console.log(data);
        setFormData({
            ...formData,
            c_addr:data.address
        });
    }
    // 팝업창 상태 관리
    const [isPopupOpen, setIsPopupOpen] = useState(false)
	// 팝업창 열기
    const openPostCode = () => {
        setIsPopupOpen(true)
    }
	// 팝업창 닫기
    const closePostCode = () => {
        setIsPopupOpen(false)
    }
    const navigate = useNavigate();
    const [ formData, setFormData ] = useState({
        c_name:"",
        c_phone:"",
        c_birthday:"",
        c_gender:"",
        c_addr:"",
        c_addrdetail:""
    })
    const onChange = (e) => {
        const { name,  value } = e.target;
        setFormData({
            ...formData,
            [name]:value
        })
        console.log(name, value);
    }
    //폼 submit이벤트
    const onSubmit = (e) => {
        e.preventDefault();
        //전화번호가 숫자인지 체크하기 
        if(isNaN(formData.c_phone)){
            alert("전화번호는 숫자만 입력해주세요");
            setFormData({
                ...formData,
                c_phone:""
            });
            return null;
        }
        if(formData.c_name !== "" && formData.c_phone !== "" && 
        formData.c_birthday !== "" && formData.c_gender !== "" && formData.c_addr !== ""){
            insertCustomer();
        }
        
        setFormData({
            c_name:"",
            c_phone:"",
            c_birthday:"",
            c_gender:"",
            c_addr:""
        })
    }
    const onReset = () => {
        setFormData({
            c_name:"",
            c_phone:"",
            c_birthday:"",
            c_gender:"",
            c_addr:""
        })
    }
    //post전송 axios
    function insertCustomer(){
        axios.post(`${API_URL}/addCustomer`,formData)
        .then(function(res){
            console.log(res);
            navigate(-1);
        }).catch(function(err){
            console.log(err);
        })
    }
    
    return (
        <div>
            <h2>신규 고객 등록하기</h2>
            <form onSubmit={onSubmit}>
                <Table className='createTable'>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                이름
                            </TableCell>
                            <TableCell>
                                <input name="c_name" type="text" value={formData.c_name} onChange={onChange} required />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                연락처
                            </TableCell>
                            <TableCell>
                                <input name="c_phone" value={formData.c_phone} type="text" onChange={onChange} required />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                생년월일
                            </TableCell>
                            <TableCell>
                                <input name="c_birthday" type="date" value={formData.c_birthday} onChange={onChange} required />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                성별
                            </TableCell>
                            <TableCell>
                                여성 <input name="c_gender" type="radio" value="여성" onChange={onChange} />
                                남성 <input name="c_gender" type="radio" value="남성" onChange={onChange} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                주소
                            </TableCell>
                            <TableCell>
                                <input name="c_addr" type="text" value={formData.c_addr} onChange={onChange} required />
                                <input name="c_addrdetail" type="text" value={formData.c_addrdetail} onChange={onChange} required placeholder='상세주소를 입력하세요'/>
                                <button type='button' onClick={openPostCode}>우편번호 검색</button>
                                <div id='popupDom'>
                                {isPopupOpen && (
                                    <PopupDom>
                                      <PopupPostCode onClose={closePostCode} onAddData={onAddData}  />
                                    </PopupDom>
                                )}
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>
                                <button type="submit">등록</button>
                                <button type="reset" onClick={onReset}>취소</button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </form>
        </div>
    );
}

export default CreateCustomer;