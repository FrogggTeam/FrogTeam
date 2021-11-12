import styled from "styled-components";
import {Link} from 'react-router-dom';

export const NewsContainer = styled.div`
min-height: 700px;
position: relative;
bottom: 0;
left: 0;
right: 0;
top: 0;
z-index: 0;
overflow: hidden;
background: linear-gradient(108deg, 
rgba(1, 147, 86, 1)0%,
rgba(10, 201, 122, 1) 100%
);
`;

export const Icon = styled(Link)`
margin-left: 32px;
margin-top: 32px;
text-decoration: none;
color: #fff;
font-weight: 700;
font-size: 32px;

@media screen and (max-width: 480px) {
    margin-left: 16px;
    margin-top: 8px;
}
`;

