import LodgingLists from '../../molecules/molecules-list/List20';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import Imgs from '../../atoms/atoms-list/Imgs';
import Border from '../../atoms/atoms-list/Border';
import PageNation from '../../molecules/molecules-list/PageNation';
import { Link } from 'react-router-dom';
// import LodgingLists from "../molecules/List20";

const PcSize = styled.main`
  min-height: calc(100vh - 80px);
  background-color: #eee;
  padding: 0 24px;
  ul{
    width:100%;
  }
  
`;
const TabletSize = styled.main`
  /* width:100%; */
  width: 100vw;
  min-height: calc(100vh - 80px);
  background-color: skyblue;
  padding: 0 24px;
  ul {
    width: 100%;
  }
`;

const MobileSize = styled.main`
  min-height: calc(100vh - 0px);
  background-color: purple;
`;

const ListStyle = ({room, totalPage, pageNationClick}) => {
  const isPc = useMediaQuery({
    query: '(min-width: 1025px)', //1025 px 이상인 경우에만 적용(1127이상.)
  });
  const isTablet = useMediaQuery({
    query: `(min-width: 677px)and (max-width: 1025px)`,
  });
  const isMobile = useMediaQuery({
    query: `(max-width: 677px)`, //744px 이하인 경우에만 적용(744이하.)
  });
  console.log(room);
  return (
    <>
      {isPc && (
        <PcSize className="Listmain">
          {room.map(({bathRoomNum, roomType, city, borough  ,bedNum,bedRoomNum ,cost, grade, id, name ,peopleLimit, isCheck, isParking, isSmoking, commentCount,roomImgUrlList}) => {
          return (<Link to={`/detail/${id}`} key={id}>
          <LodgingLists bathRoomNum={bathRoomNum} city={city} borough={borough} isCheck={isCheck} isParking={isParking} isSmoking={isSmoking} commentCount={commentCount} bedNum={bedNum} roomImgUrlList={roomImgUrlList} roomType={roomType} peopleLimit={peopleLimit} bedRoomNum={bedRoomNum} cost={cost} grade={grade} id={id} name={name} />
          </Link>
          )
          }) }
          <PageNation totalPage={totalPage} pageNationClick={pageNationClick}/>
        </PcSize>
      )}
      {isTablet && (
        <TabletSize className="Listmain">
           {room.map(({bathRoomNum, roomType, city, borough ,bedNum,bedRoomNum ,cost, grade, id, name ,peopleLimit, isCheck, isParking, isSmoking, commentCount,roomImgUrlList}) => {
          return (<Link to={`/detail/${id}`} key={id}>
          <LodgingLists bathRoomNum={bathRoomNum}  city={city} borough={borough}  isCheck={isCheck} isParking={isParking} isSmoking={isSmoking} commentCount={commentCount} bedNum={bedNum} roomImgUrlList={roomImgUrlList} roomType={roomType} peopleLimit={peopleLimit} bedRoomNum={bedRoomNum} cost={cost} grade={grade} id={id} name={name} />
          </Link>
          )
          }) }
          <PageNation totalPage={totalPage} pageNationClick={pageNationClick} />
        </TabletSize>
      )}
      {isMobile && (
        <MobileSize className="Listmain">
          <Border bigCarouselImg >
            <Imgs carousalBigImg src="https://a0.muscache.com/im/pictures/02a7fd89-b923-4541-aff6-a6eeff4d4445.jpg?im_w=1200"/>
          </Border>
          <PageNation totalPage={totalPage} pageNationClick={pageNationClick}/>
        </MobileSize>
      )}
    </>
  );
};
export default ListStyle;
