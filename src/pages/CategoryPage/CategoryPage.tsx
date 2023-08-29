import React, { useState } from "react";
import { useQuery } from "react-query";
import { getCategoryPosts, getCategoryCountryPosts } from "../../api/api";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { cardItem } from "../../types/posts";
import { Cards } from "../../components/Cards";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Continent from "./CategoryPageComponents/ContinentImage";
import FixedWritingButton from "./CategoryPageComponents/FixedWritingButton";
import ContinentPageSelectCountry from "./CategoryPageComponents/ContinentPageSelectCountryButton";
import PageMovingButton from "../../components/PageMovingButton";
import { RootState } from "../../types/login";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner";


export const CategoryPage = () => {
  const state = useSelector((state: RootState) => state.isLogin.isLogin);
  const param = Number(useParams().id);
  const [page, setpage] = useState<number>(1);
  const [country, setCountry] = useState<string | null>(null);

  const handleCountryChange = (country: string) => {
    setCountry(country);
    setpage(1);
  };

  const apiFunction: any = country ? getCategoryCountryPosts : getCategoryPosts;

  const fetchData = async () => {
    if (country !== null) {
      return await apiFunction(param, country as string, page);
    } else {
      return await apiFunction(param, page);
    }
  };

  const { isLoading, isError, data } = useQuery(
    ["categoryPost", param, country, page],
    fetchData
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <p>오류가 발생하였습니다...!</p>;
  }

  const totalPages = data.totalPages;

  const nextPage = () => {
    if (page < totalPages) setpage(page + 1);
  };

  const previousPage = () => {
    if (page > 1) {
      setpage(page - 1);
    }
  };

  const goToPage = (pageNumber: number) => {
    setpage(pageNumber);
  };

  const startPage = Math.floor((page - 1) / 5) * 5 + 1;
  const endPage = Math.min(startPage + 4, totalPages);

  return (
    <div>
      <Header />
      <Continent id={param} />
      <ContinentPageSelectCountry
        id={param}
        onSelectCountry={handleCountryChange}
      />
      <StCardContainer>
        {data.data?.map((item: cardItem) => (
          <Cards key={item.id} items={item} />
        ))}
      </StCardContainer>

      {state ? <FixedWritingButton id={param} /> : <></>}

      <Pagebuttons>
        <PageMovingButton
          onClick={previousPage}
          text="<"
          color={page === 1 ? "#CFCED7" : "#2BDE97"}
          backgroundColor="white"
        />
        {Array.from({ length: 5 }, (_, index) => {
          const pageNumber = startPage + index;
          return (
            pageNumber <= endPage && (
              <PageMovingButton
                key={pageNumber}
                onClick={() => goToPage(pageNumber)}
                text={`${pageNumber}`}
                color={pageNumber === page ? "white" : "#484848"}
                backgroundColor={pageNumber === page ? "#2BDE97" : "white"}
              />
            )
          );
        })}
        <PageMovingButton
          onClick={nextPage}
          text=">"
          color={page === totalPages ? "#CFCED7" : "#2BDE97"}
          backgroundColor="white"
        />
      </Pagebuttons>
      <Footer />
    </div>
  );
};

const StCardContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  gap: 24px;
`;

const Pagebuttons = styled.div`
  gap: 5px;
  justify-content: center;
  display: flex;
  margin-top: 100px;
  margin-bottom: 120px;
`;
