import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    
`;

const ProductContainer = styled.div`
    margin-top: 10px;
    margin-bottom: 30px;
    padding:10px;

    .product-wrapper{
        /* border:1px solid #e1e1e1; */
        padding-top:10px;
        padding-bottom:10px;
        margin-bottom: 5px;
        border-bottom: 1px solid #e1e1e1;
    }

    .product-box{
        overflow: hidden;
    }

    .product-image{
        width: 100px;
        float: left;
    }

    .product-info-box{
        float: left;
        margin-left: 10px;
        font-size: 14px;
        font-weight: 700;
    }
`;

const TableBox = styled.div`
    margin-top: 10px;
    /* border: 1px solid #e1e1e1; */
    /* border-radius: 3px; */
    /* margin-bottom: 20px; */
    .title{
        font-size: 24px;
        font-weight: 600;
        padding:5px;
        /* border-bottom: 1px solid #e1e1e1; */
        color:#333;
    }

    .table-box{
    }

    table{
        width: fit-content;
        table-layout:fixed;
        text-align: center;
        font-size: 13px;
    }

    table thead{
    }

    table thead th{
        background:#00B8BA;
        color:white;
        transition: .5s;
        &:hover{
            background: #31CEAE;
        }
    }

    table tbody tr{
        color:#333;
    }
    table th{
        cursor: pointer;
        padding:5px;
    }

    table td{
        padding:3px;
    }

    .fixed-header {
        position: sticky;
        top: 0px;
    }
`;

const TdEmphasize1 = styled.td`
    padding:3px;
    background: #FFFB00;
    font-weight: 600;
`;

const TdEmphasize2 = styled.td`
    padding:3px;
    background: #E86797;
    font-weight: 700;
`;

const HomeBody = (props) => {
    return (
        <>
            <Container>
                <ProductContainer>
                    {props.productStateList?.map(productState => {
                        return (
                            <React.Fragment key={productState.product.id}>
                                <div className='product-wrapper'>
                                    <div className='product-box'>
                                        <img className='product-image' src={productState.product.image_url} alt=''></img>
                                        <div className='product-info-box'>
                                            <div>[상품명] {productState.product.default_name}</div>
                                            <div>[관리상품명] {productState.product.management_name}</div>
                                            <div>[상품코드] {productState.product.code}</div>
                                        </div>

                                    </div>
                                    <TableBox>
                                        <div className='table-box' style={{ overflow: 'auto' }}>
                                            <table>
                                                <colgroup>
                                                    <col width={`50px`} />
                                                    <col width={`200px`} />
                                                    <col width={`200px`} />
                                                    <col width={`150px`} />
                                                    <col width={`100px`} />
                                                    <col width={`100px`} />
                                                    <col width={`100px`} />
                                                    <col width={`100px`} />
                                                    <col width={`100px`} />
                                                    <col width={`100px`} />
                                                </colgroup>
                                                <thead className='fixed-header'>
                                                    <tr>
                                                        <th>No</th>
                                                        <th>옵션명</th>
                                                        <th>관리옵션명</th>
                                                        <th>옵션코드</th>
                                                        <th>총 입고량</th>
                                                        <th>총 출고량</th>
                                                        <th>7일간 출고량</th>
                                                        <th>14일간 출고량</th>
                                                        <th>21일간 출고량</th>
                                                        <th>남은 재고</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {productState?.productOptions?.map((productOption, index) => {
                                                        return (
                                                            <tr key={productOption.id}>
                                                                <td>{index + 1}</td>
                                                                <td>
                                                                    <div>{productOption.default_name}</div>
                                                                </td>
                                                                <td>
                                                                    <div>{productOption.management_name}</div>
                                                                </td>
                                                                <td>
                                                                    <div>{productOption.code}</div>
                                                                </td>
                                                                <td>
                                                                    <div>{productOption.total_receive_unit}</div>
                                                                </td>
                                                                <td>
                                                                    <div>{productOption.total_release_unit}</div>
                                                                </td>
                                                                <TdEmphasize1>
                                                                    <div>{productOption.total_release_unit_7}</div>
                                                                </TdEmphasize1>
                                                                <TdEmphasize1>
                                                                    <div>{productOption.total_release_unit_14}</div>
                                                                </TdEmphasize1>
                                                                <TdEmphasize1>
                                                                    <div>{productOption.total_release_unit_21}</div>
                                                                </TdEmphasize1>
                                                                <TdEmphasize2>
                                                                    <div>{productOption.total_receive_unit - productOption.total_release_unit}</div>
                                                                </TdEmphasize2>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>

                                    </TableBox>
                                </div>
                            </React.Fragment>
                        );
                    })}
                </ProductContainer>
            </Container>
        </>
    );
}

export default HomeBody;