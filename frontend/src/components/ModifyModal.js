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
import { updateRecordApi } from '../API';
import { useSearchParams } from 'react-router-dom';

export default function ModifyModal({ dietData, setDietData, setUserDietData }) {
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
    const [modifiedDiet, setModifiedDiet] = useState([]);
    const [selectedDiet, setSelectedDiet] = useState([]);
    const [deletedDiet, setDeletedDiet] = useState([]);
    const [searchParams] = useSearchParams();

    const choiceDiet = (diet) => {
        const formattedDiet = {
            selected_diet: {
                food_name: diet.DESC_KOR,
                food_gram: diet.SERVING_SIZE,
                food_calorie: diet.NUTR_CONT1,
            },
            food_quantity: 1,
        };

        setDiet((prev) => [...prev, formattedDiet]);
        setSelectedDiet((prev) => [...prev, formattedDiet]);
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
            setDiet([...dietData.selected_diet_quantity]);
            setSelectedMealType(dietData.meal_category);
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

    const saveDiets = () => {
        const data = {
            selected_diet: selectedDiet,
            deleted_diet: deletedDiet,
            modified_diet: modifiedDiet,
            meal_calorie: sumCal(),
        };
        updateRecordApi(searchParams.get('created_date'), selectedMealType, data).then((response) => {
            setDietData((prev) => ({ ...prev, [selectedMealType]: response.data }));
            setUserDietData((prev) => {
                for (let i in prev) {
                    if (prev[i].meal_category === selectedMealType) {
                        prev[i] = response.data;
                    }
                    return [...prev];
                }
            });
        });
        onClose();
    };

    // 검색 아이콘 클릭 시 API 요청을 보내는 함수
    const handleSearch = (e) => {
        e.preventDefault();
        // 검색어가 비어 있을 경우 요청을 보내지 않음
        if (!search) {
            return;
        }

        axios
            .get(`https://openapi.foodsafetykorea.go.kr/api/${process.env.REACT_APP_SERVICE_KEY}/I2790/json/0/100/DESC_KOR=${search}`)
            .then((response) => {
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

    function sumCal() {
        let result = 0;
        for (let item in diet) {
            result += +diet[item].selected_diet.food_calorie * diet[item].food_quantity;
        }
        return result.toFixed(2);
    }

    const compareItem = (item) => {
        const comparedItem = item.selected_diet.food_name;

        if (modifiedDiet.length > 0) {
            // modifiedDiet 배열에 element가 존재하면 item과 element들 비교
            for (let i in modifiedDiet) {
                if (comparedItem === modifiedDiet[i].selected_diet.food_name) {
                    // item과 같은 element가 이미 존재하면 quantity만 수정하고 함수 종료
                    modifiedDiet[i].food_quantity = item.food_quantity;
                    return;
                }
            }
        }

        for (let diet in dietData.selected_diet_quantity) {
            // 기존 diet와 item 비교하여 수정한 item이 기존 diet에 속해 있으면 modifiedDiet에 추가
            if (comparedItem === dietData.selected_diet_quantity[diet].selected_diet.food_name) {
                setModifiedDiet((prev) => [...prev, item]);
            }
        }
    };

    const selectedDietQuantity = (item) => {
        // selectedDiet에 element 없을 시, 함수 종료
        if (selectedDiet.length === 0) return;

        // item이 selectedDiet에 존재하면 selectedDiet 내 item과 같은 element의 quantity 수정
        for (let i in selectedDiet) {
            if (item.selected_diet.food_name === selectedDiet[i].selected_diet.food_name) {
                selectedDiet[i].food_quantity = item.food_quantity;
                return;
            }
        }
    };

    const addDeletedDiet = (item) => {
        for (let diet in dietData.selected_diet_quantity) {
            // 기존 diet와 item 비교하여 삭제한 item이 기존 diet에 속해 있으면 deletedDiet에 추가
            if (item.selected_diet.food_name === dietData.selected_diet_quantity[diet].selected_diet.food_name) {
                setDeletedDiet((prev) => [...prev, item]);
                return;
            }
        }
    };

    return (
        <>
            <Button
                width="4vw"
                height="3vh"
                onClick={() => {
                    setOverlay(<OverlayOne />);
                    onOpen();
                }}
            >
                수정
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
                                    <li>내용량(g)</li>
                                    <li>수량</li>
                                    <li>열량(kcal)</li>
                                    <li>삭제</li>
                                </ul>
                                <ul className="choiceData">
                                    {diet?.map((item, index) => (
                                        <div className="searchList" key={index}>
                                            <li className="searchLine">{item?.selected_diet?.food_name}</li>
                                            <li className="searchLine">{item?.selected_diet?.food_gram}</li>
                                            <input
                                                className="searchLine"
                                                type="number"
                                                defaultValue={item?.food_quantity}
                                                onChange={(e) => {
                                                    item.food_quantity = e.target.value;
                                                    compareItem(item);
                                                    selectedDietQuantity(item);
                                                    setDiet((prev) => [
                                                        ...prev.slice(0, index),
                                                        item,
                                                        ...prev.slice(index + 1),
                                                    ]);
                                                }}
                                            />
                                            <li className="searchLine">
                                                {item.selected_diet?.food_calorie * item?.food_quantity}
                                            </li>
                                            <button
                                                className="deleteBtn"
                                                aria-label="delete"
                                                sx={{ backgroundColor: 'white' }}
                                                onClick={() => {
                                                    handleDeleteItem(index);
                                                    addDeletedDiet(item);
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
