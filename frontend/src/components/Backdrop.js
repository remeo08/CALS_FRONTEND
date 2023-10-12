import React, { useEffect, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Text,
    Input,
    IconButton,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointRight, faL, faSearch } from '@fortawesome/free-solid-svg-icons';
import './Backdrop.css';
import axios from 'axios';
import { todayRecordApi } from '../API';
import { useSearchParams } from 'react-router-dom';

export default function Backdrop({ userDietInfo, setDotDate }) {
    const OverlayOne = () => <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />;

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [overlay, setOverlay] = React.useState(<OverlayOne />);

    const [search, setSearch] = useState(''); // 검색어를 상태로 관리
    const [error, setError] = useState(null); // 에러 상태를 관리
    const [searchResultMessage, setSearchResultMessage] = useState('');
    const [selectedData, setSelectedData] = useState(null);

    // const [isDelete, setIsDelete] = useState(false);

    const [dropdown, setDropdown] = useState(false);
    const [responseData, setResponseData] = useState([]); // API 응답 데이터를 상태로 관리

    const [selectedMealType, setSelectedMealType] = useState(null);
    // 각 식사 유형에 대한 선택 여부를 추적하는 상태 추가
    const [isSelected, setIsSelected] = useState({
        아침: false,
        점심: false,
        저녁: false,
        간식: false,
    });

    const [diet, setDiet] = useState([]);
    const [searchPrams] = useSearchParams();

    const choiceDiet = (diet) => {
        diet.food_quantity = 1;
        setDiet((prev) => [...prev, diet]);
        setDropdown(false);
        setResponseData([]);
    };

    // 클릭 핸들러를 이용하여 선택 상태 업데이트
    const handleMealTypeClick = (mealType) => {
        // 이미 선택된 버튼을 다시 클릭하면 선택 해제
        if (selectedMealType === mealType) {
            setSelectedMealType(null);
        } else {
            setSelectedMealType(mealType);
        }
    };

    const selectedButtonStyle = {
        backgroundColor: 'black', // 선택된 버튼의 배경색을 변경하세요
        color: 'white', // 선택된 버튼의 글자색을 변경하세요
    };

    useEffect(() => {
        if (isOpen) {
            // 모달이 열릴 때 추가된 내용을 불러오는 API 호출 또는 다른 데이터 로딩 로직을 추가합니다.
            // 이 예제에서는 빈 배열을 사용하여 모달이 열릴 때마다 빈 데이터를 표시하도록 했습니다.
            setResponseData([]);
        }
    }, [isOpen]);

    // Input 값이 변경될 때 호출되는 함수
    const onChange = (e) => {
        setSearch(e.target.value);
        if (e.target.value === '') {
            setDropdown(false);
        }
    };

    // 항목 삭제를 처리하는 함수
    const handleDeleteItem = (index) => {
        // // 클릭 대기 중인 경우 삭제 이벤트 무시
        // if (isDelete) {
        //     return;
        // }

        // // 클릭 대기 상태로 설정
        // setIsDelete(true);

        // 삭제할 아이템이 존재하는지 확인합니다.
        if (diet && diet.length > 0) {
            const updatedData = [...diet];
            updatedData.splice(index, 1);
            setDiet(updatedData);
        }

        // // 클릭 대기 상태 해제 (예: 1초 후)
        // setTimeout(() => {
        //     setIsDelete(false);
        // }, 1000); // 1초 후 클릭 대기 상태 해제
    };

    const onCloseModal = () => {
        // 모달 창이 닫힐 때 검색 상태를 초기화
        setSearch('');
        setDropdown(false);
        onClose();
    };

    // const handleQuantity = (e) => {
    //     setQuantity(e.target.value);
    // };

    const saveDiets = () => {
        if (diet.length === 0 || !selectedMealType) {
            alert('되겠냐');
            return;
        }
        // console.log('방울뱀이다', diet);
        const selected_diet = [];
        for (let item in diet) {
            const mealData = {
                food_name: diet[item].DESC_KOR,
                food_calorie: diet[item].NUTR_CONT1,
                food_gram: diet[item].SERVING_SIZE,
                food_quantity: diet[item].food_quantity,
            };
            selected_diet.push(mealData);
        }
        const data = {
            meal_category: selectedMealType,
            meal_calorie: sumCal(),
            selected_diet,
            created_date: searchPrams.get('created_date'),
        };
        console.log('todaydata', data);
        todayRecordApi(data).then((response) => {
            userDietInfo((prev) => [...prev, response.data]);
            setDotDate((prev) => [...prev, response.data.created_date]);
        });
        setDiet([]);
        setSelectedMealType(null);
        setSearch('');
        onClose();
    };

    // 검색 아이콘 클릭 시 API 요청을 보내는 함수
    const handleSearch = (e) => {
        e.preventDefault();
        console.log('handleSearch 함수가 호출되었습니다.');
        // 검색어가 비어 있을 경우 요청을 보내지 않음
        if (!search) {
            return;
        }

        axios
            .get(`https://openapi.foodsafetykorea.go.kr/api/${process.env.REACT_APP_SERVICE_KEY}/I2790/json/0/100/DESC_KOR=${search}`)
            .then((response) => {
                console.log('API 응답 데이터:', response.data);

                const responseData = response.data.I2790.row;

                if (responseData && responseData.length > 0) {
                    setResponseData(responseData);
                    setSearchResultMessage(''); // 데이터가 있을 때 검색 결과 메시지 초기화
                } else {
                    setResponseData([]);
                    // 데이터가 없을 때 검색 결과 메시지 설정
                    setSearchResultMessage('해당하는 데이터가 없습니다.');
                }
                setDropdown(true);
            })
            .catch((error) => {
                setError(error);
            });
    };
    // console.log('들어오냐?', responseData);

    function sumCal() {
        let result = 0;
        for (let item in diet) {
            // console.log('열량', item);
            // console.log('식단', diet);
            result += +diet[item].NUTR_CONT1 * diet[item].food_quantity;
        }
        return result.toFixed(2);
    }

    return (
        <>
            <Button
                width="3.5vw"
                height="2.5vh"
                onClick={() => {
                    setOverlay(<OverlayOne />);
                    onOpen();
                }}
            >
                추가
            </Button>
            <Modal isCentered isOpen={isOpen} onClose={onCloseModal}>
                {overlay}
                <ModalContent sx={{ heigh: 600 }}>
                    <ModalHeader>맛있게 먹으면 0kcal</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form className="searchBar" onSubmit={handleSearch}>
                            <Input
                                placeholder="찾으시는 음식을 검색해주세요"
                                type="text"
                                value={search}
                                onChange={onChange}
                            />
                            <button className="searchBtn">
                                <FontAwesomeIcon icon={faSearch} className="searchIcon" />
                            </button>
                            {dropdown ? (
                                <div className="searchSelect">
                                    {searchResultMessage && <p className="searchError">{searchResultMessage}</p>}
                                    <ul className="searchResult">
                                        {responseData?.map((item, index) => (
                                            <div
                                                onClick={() => {
                                                    choiceDiet(item);
                                                }}
                                                className="searchList"
                                                key={index}
                                            >
                                                <div className="searchLine">
                                                    {item.DESC_KOR}
                                                    <span className="nutrition">
                                                        ({item.SERVING_SIZE}g / {item.NUTR_CONT1}kcal)
                                                    </span>
                                                </div>
                                                {/* 다른 필드도 필요한 만큼 추가하세요 */}
                                            </div>
                                        ))}
                                    </ul>
                                </div>
                            ) : null}
                        </form>
                        <div className="mealTime">
                            <Button
                                sx={{ backgroundColor: 'white' }}
                                onClick={() => handleMealTypeClick('breakfast')}
                                style={selectedMealType === 'breakfast' ? selectedButtonStyle : {}}
                            >
                                아침
                            </Button>
                            <Button
                                sx={{ backgroundColor: 'white' }}
                                onClick={() => handleMealTypeClick('lunch')}
                                style={selectedMealType === 'lunch' ? selectedButtonStyle : {}}
                            >
                                점심
                            </Button>
                            <Button
                                sx={{ backgroundColor: 'white' }}
                                onClick={() => handleMealTypeClick('dinner')}
                                style={selectedMealType === 'dinner' ? selectedButtonStyle : {}}
                            >
                                저녁
                            </Button>
                            <Button
                                sx={{ backgroundColor: 'white' }}
                                onClick={() => handleMealTypeClick('snack')}
                                style={selectedMealType === 'snack' ? selectedButtonStyle : {}}
                            >
                                간식
                            </Button>
                        </div>
                        {diet && diet.length > 0 && (
                            <div className="searchData">
                                <ul className="searchTitle">
                                    <li>식품이름</li>
                                    <li>총 내용량(g)</li>
                                    <li>열량(kcal)</li>
                                    <li>수량</li>
                                    <li>삭제</li>
                                </ul>
                                <ul className="choiceData">
                                    {diet?.map((item, index) => (
                                        <div className="searchList" key={index}>
                                            <li className="searchLine">{item.DESC_KOR}</li>
                                            <li className="searchLine">{item.SERVING_SIZE}</li>
                                            <li className="searchLine">{item.NUTR_CONT1 * item.food_quantity}</li>
                                            <input
                                                className="searchLine"
                                                type="number"
                                                defaultValue={item.food_quantity}
                                                maxLength={1}
                                                onChange={(e) => {
                                                    item.food_quantity = e.target.value;
                                                    setDiet((prev) => [
                                                        ...prev.slice(0, index),
                                                        item,
                                                        ...prev.slice(index + 1),
                                                    ]);
                                                }}
                                            />
                                            <button
                                                className="deleteBtn"
                                                aria-label="delete"
                                                sx={{ backgroundColor: 'white' }}
                                                onClick={() => {
                                                    console.log('IconButton가 클릭되었습니다');
                                                    handleDeleteItem(index);
                                                }} // 삭제 버튼을 클릭하면 항목 삭제 함수 호출
                                            >
                                                <DeleteIcon />
                                            </button>
                                            {/* 다른 필드도 필요한 만큼 추가하세요 */}
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div className="total">총 열량 : {sumCal()} kcal</div>
                    </ModalBody>
                    <ModalFooter sx={{ paddingTop: 0 }}>
                        <Button onClick={onCloseModal}>닫기</Button>
                        <Button
                            sx={{ marginLeft: 2 }}
                            onClick={() => {
                                if (selectedMealType && selectedData) {
                                    // 선택한 식사 유형과 데이터를 저장하는 방법을 처리합니다.
                                    console.log(`선택한 식사 유형: ${selectedMealType}`);
                                    console.log('선택한 데이터:', selectedData);

                                    // 여기에 선택한 식사 유형과 데이터를 저장하는 로직을 추가하세요.
                                    // 예를 들어, 상태 변수나 다른 저장 방식을 사용하여 데이터를 저장할 수 있습니다.
                                }
                                // 모달을 닫습니다.
                                saveDiets();
                            }}
                        >
                            저장
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
