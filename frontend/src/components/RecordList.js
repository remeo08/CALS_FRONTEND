import React, { useState } from 'react';

const RecordList = () => {
    const [content, setContent] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newContent, setNewContent] = useState('');
    const [editingIndex, setEditingIndex] = useState(-1);

    const handleAddContent = () => {
        if (editingIndex !== -1) {
            // 수정 중인 경우
            const updatedContent = [...content];
            updatedContent[editingIndex] = newContent;
            setContent(updatedContent);
            setEditingIndex(-1); // 수정 모드 종료
        } else {
            // 추가하는 경우
            setContent([...content, newContent]);
        }

        setNewContent('');
        setIsModalOpen(false);
    };

    const openModal = (index) => {
        setIsModalOpen(true);
        if (index !== undefined) {
            // 수정 모드로 모달을 열 때
            setEditingIndex(index);
            setNewContent(content[index]);
        } else {
            // 추가 모드로 모달을 열 때
            setEditingIndex(-1);
            setNewContent('');
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingIndex(-1); // 모달 닫을 때 수정 모드 종료
        setNewContent('');
    };

    const handleEditContent = (index) => {
        // 수정 버튼을 클릭하면 해당 인덱스의 내용을 수정 모드로 편집
        openModal(index);
    };

    const handleDeleteContent = (index) => {
        // 삭제 버튼을 클릭하면 확인 메시지를 띄우고 삭제 여부를 물어봅니다.
        const isConfirmed = window.confirm('정말 삭제 하시겠습니까?');
        if (isConfirmed) {
            const updatedContent = [...content];
            updatedContent.splice(index, 1);
            setContent(updatedContent);
        }
    };

    return (
        <div>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <input type="text" value={newContent} onChange={(e) => setNewContent(e.target.value)} />
                        <button onClick={handleAddContent}>{editingIndex !== -1 ? '수정' : '추가'}</button>
                        <button onClick={closeModal}>닫기</button>
                    </div>
                </div>
            )}

            <div>
                {content.map((item, index) => (
                    <div key={index}>
                        {item}
                        <button onClick={() => handleEditContent(index)}>수정</button>
                        <button onClick={() => handleDeleteContent(index)}>삭제</button>
                    </div>
                ))}
                {content.length === 0 && (
                    <div>
                        <p>내용 없음</p>
                        <button onClick={() => openModal()}>내용 추가</button>
                    </div>
                )}
                {content.length > 0 && <button onClick={() => openModal()}>내용 추가</button>}
            </div>
        </div>
    );
};

export default RecordList;
