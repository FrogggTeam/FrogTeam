import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, Col, Form, Row } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";


const baseUrl = "http://localhost:5000";

const FormG = ({ onChange, text, type, readOnly=false, value }) => {
	return (
		<Form.Group as={Row} className="mb-3">
			<Form.Label column sm="2">
				{text}
			</Form.Label>
			<Col sm="10">
				<Form.Control required onChange={onChange} type={type} value={value} readOnly={readOnly}/>
			</Col>
		</Form.Group>
	);
};

const AddAsset = ({ onHide, setAddMode }) => {
	const [exchange, setExchange] = useState("Upbit");
	const [coinName, setCoinName] = useState("");
	const [amount, setAmount] = useState(0);
	const [buyPrice, setBuyPrice] = useState(0);

	const [coins, setCoins] = useState([]);
  const [coinsDisplay, setCoinsDisplay] = useState([]);
  
  const { data, loading, error } = useAxios({
    method: "GET",
    baseURL: "http://localhost:5000",
    url: "coingecko/coinlist",
  });

  useEffect(() => {
    if (!loading && data) {
      setCoins(data);
			setCoinsDisplay(data.slice(0, 10));
    }
  }, [data, loading, coinName]);

	const exchangeOnChange = (e) => {
		setExchange(e.target.value);
	};
	const coinNameOnChange = (e) => {
		let searchedCoins = [];
    coins.forEach((coin) => {
      if (
        coin.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        coin.id.includes(e.target.value.toLowerCase()) ||
        coin.symbol.includes(e.target.value.toLowerCase())
      ) {
        searchedCoins = [...searchedCoins, coin];
      }
    });
		setCoinName(searchedCoins[0])
    setCoinsDisplay(searchedCoins.slice(0, 10));
	};
	
	const amountOnChange = (e) => {
		setAmount(e.target.value);
	};
	const buyPriceOnChange = (e) => {
		setBuyPrice(e.target.value);
	};

	const handleSubmitOnClick = async (e) => {
		e.preventDefault();
		const data = {
			exchange: exchange.toUpperCase(),
			coinName,
			amount,
			buyPrice,
		};
		if(exchange && buyPrice && amount) {
			const result = await axios.post(`${baseUrl}/assets/create`, data);
			setAddMode();
			onHide();
		} else {
			window.alert('????????? ?????? ??????????????????!')
		}
	};

	return (
		<>
			<Modal.Body>
				<Form>
					<Form.Group as={Row} className="mb-3">
						<Form.Label column sm="2">
							?????????
						</Form.Label>
						<Col sm="10">
							<Form.Select onChange={exchangeOnChange} as={Row} className="mb-3">
								<option>Binance</option>
								<option selected>Upbit</option>
							</Form.Select>
						</Col>
					</Form.Group>
					<FormG
						onChange={coinNameOnChange}
						text="?????? ??????"
						type="text"
					/>
					<Form.Group as={Row} className="mb-3">
						<Form.Label column sm="2">
							?????? ??????
						</Form.Label>
						<Col sm="10">
							<Form.Select required className="mb-3">
								{coinsDisplay[0] ? (
									<>
										<option hidden value={coinsDisplay[0].id}>
											{coinsDisplay[0].id}
										</option>
										{coinsDisplay.map((coin) => (
											<option value={coin.id}> {coin.id} </option>
										))}
									</>
								) : (
									<option hidden>?????? ?????? ????????? ???????????????</option>
								)}
							</Form.Select>
						</Col>
					</Form.Group>
					<FormG onChange={amountOnChange} text="?????? ??????" type="number" />
					<FormG
						onChange={buyPriceOnChange}
						text="?????? ?????????(???)"
						type="number"
					/>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<div className="d-flex justify-content-end">
					<Button
						className="mx-1"
						onClick={handleSubmitOnClick}
						variant="primary"
						type="submit"
					>
						??????
					</Button>
					<Button
						className="mx-1"
						onClick={onHide}
						variant="danger"
						type="submit"
					>
						??????
					</Button>
				</div>
			</Modal.Footer>
		</>
	);
};

export default AddAsset;
