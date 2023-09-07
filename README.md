# 김유현

# Binace-API-Dashboard 프로젝트
바이넨스 API를 활용하여 USDT 코인들을 정리해서 보여줄 수 있고, 메모를 작성 및 관리할 수 있도록 구현한 프로젝트 「Binance Dashboard」 입니다.

> 사이트 링크 : (https://binance-api-dashboard.vercel.app/)

<br>

## 개발자의 GitHub 주소

<table>
  <tr> 
    <td align="center"><a href="https://github.com/yuhyeon99"><img src="https://avatars.githubusercontent.com/u/83055700?s=96&v=4" width="100px;" alt=""/><br /><sub><b>김유현</b></sub></a><br /><a href="https://github.com/yuhyeon99" title="Code">🏠</a>
    </td>
  </tr>
</table>

> "어제 자신을 넘어 더욱 성장을 추구하는 개발자 김유현이라고 합니다."

<br>

# 🔍 목차

> 1. GitHub 관리 전략
> 2. 프로젝트
>    1. 개요
>    2. 개념
>    3. 기능
>    4. 신중하게 생각한 부분
>       - UI/UX
>       - 프로젝트 구상
> 3. 개발 환경
>    1. 프레임워크
>    2. 데이터베이스
> 4. 힘들었던 일
> 5. 사용 기술
> 6. 자기 평가
> 7.  조언하고 싶은 포인트

<br>



# 1. GitHub 관리 전략

## 1.1. :pushpin: Commit Convention

|   [Type]    |             설명              |                       예                       |
| :---------: | :---------------------------: | :--------------------------------------------: |
|     feat     |  기능 추가 :heavy_plus_sign:   |           "feat : TodoList add 기능 추가"           |
|     fix     |        버그 수정 :bug:         | "fix : 이미지 업로드 버그 수정" |
|   modify    |  코드 타이포 수정 :zap:   |      "modify : 날씨 API 서비스 수정"      |
|  refactor   |  코드 구조 변경 :pencil2:   |   "refactor : 입력 코드와 리스트 코드 분리"    |
| enhancement | UI 디자인 변경  (CSS) :art: |      "enhancement : 날씨 display UI 수정"      |
| Deployment  |                               |                                                |

<br>

_____


## 1.2. GIt Branch관리

```
main -- develop -- add/#1   
                \_ add/#2     
```

* `main` : 배포되는 기본 버전
* `develop` : 개발 브랜치
* 기능 개발 브랜치는 develop 브랜치에서 생성되어 개발을 진행합니다.


<br>


# 2. 프로젝트

## 2.1. 개요

- 프로젝트 이름: Binace-API-Dashboard
- 의미: 바이넨스 API를 활용하여 USDT 코인들을 정리해서 보여줄 수 있고, 메모를 작성 및 관리할 수 있도록 구현한 프로젝트 「Binance Dashboard」 입니다.


## 2.2. 개념

바이넨스 API 로 받아온 데이터들 중 USDT코인만 필터링해서 보여주고, 정렬기능을 통해 "상승률", "거래량", "가격" 으로 오름차순 및 내림차순으로 정렬할 수 있으며 특정 코인을 검색할 수 있는 검색기능이 존재합니다.
추가적으로 대용량 데이터를 받아올 때를 대비해서 페이지네이션 기능이 존재합니다. 또한 Create, Read, Update, Delete가 가능한 메모장을 로컬스토리지를 기반으로 관리할 수 있습니다.

### 특징

1. 바이넨스 API 호출 관련 코드에서 USDT코인들만 받을 수 있도록 설정했습니다.
2. 사용자는 가격, 상승률, 거래량을 통해 코인들을 오름차순 및 내림차순으로 정렬할 수 있습니다. 
3. MUI 를 사용해서 크로스 브라우징(크롬, 사파리) 및 반응형에도 큰 문제없이 사용 가능합니다.
4. 대용량 데이터를 대비한 페이지네이션을 구현했습니다.
5. 로컬스토리지를 기반한 메모장을 관리할 수 있습니다.



<br>



##  2.3. 기능

1. 24시간을 기준으로 바이넨스상 USDT코인들 상승률 및 거래량 정렬 그리고 검색을 통해 확인 가능.
2. 로컬스토리지를 기반한 메모장을 관리할 수 있습니다.

<br>

## 2.4. 주의깊게 생각한 부분(UX)

1. 바이넨스 API 응답 전 화면 로딩 애니메이션 아이콘으로 대체

![image](https://github.com/yuhyeon99/Binance-API-Dashboard/assets/83055700/85024b95-0279-44aa-a5ab-751f0c359289)

![image](https://github.com/yuhyeon99/Binance-API-Dashboard/assets/83055700/eaba6943-cd54-4fc9-aaa0-5b2556b05a8a)


바이넨스 API 관련 함수에서 응답을 받을 때 까지 MUI로 구현한 애니메이션 아이콘 화면을 띄워주도록 코드 작성했습니다.

2. 응답 데이터 정렬

![image](https://github.com/yuhyeon99/Binance-API-Dashboard/assets/83055700/deef4859-baa7-4b44-bc39-3c5c25e4d827)


토글 버튼을 클릭 시, 오름차순 및 내림차순으로 정렬할 수 있습니다.

3. 검색 시 정렬 및 페이징을 고려하여 결과 확인
   - 검색하기 버튼을 제거해서 UI 간소화 하였고 onChange 함수를 사용해서 타이핑시 바로 적용되도록 구현
   
![image](https://github.com/yuhyeon99/Binance-API-Dashboard/assets/83055700/b743ff1f-6d5e-4710-b66c-7f94d743bfe0)


4. 메모장
   - 메모장 또한 Binanace Dashboard와 동일하게 UI/UX 를 고려해서 제작했습니다.

![image](https://github.com/yuhyeon99/Binance-API-Dashboard/assets/83055700/28952136-923e-49a2-8efe-e1c08b514cae)



<br><br>

## 2.4. 주의깊게 생각한 부분(프로젝트 구상)

- ### Binance-API-Dashboard
    - 대용량 데이터를 어디서 받아와야할지 고민
    - 코인관련 API를 활용
    - 단순 정보보단 상승률 또는 거래량 같은 유동적인 데이터를 정렬해서 볼 수 있도록 기획


# 3. 개발 환경

## 3.1. 프레임워크

1. Front
   - React.js  `18.2.0`
   - TypeScript `4.9.5`
   - MUI `5.14.8`



## 3.2. 데이터베이스

1. LocalStorage



## 3.3. 라이브러리

1. Recoil
2. Vercel
3. Gird(mui)

<br>

## 개발 환경

OS: Window

IDE: Visual Studio Code


<br>

------


# 4. 힘들었던 일

1. 검색 기능과 정렬기능 사이에 논리적 오류가 발생해서 트러블슈팅하는 과정 중 개발이 지체됐습니다.
2. MUI를 사용해서 편하게 레이아웃을 구현했지만 작은 단위 수정하는 부분에서 수정이 어려웠습니다.

   ### 원인

   1. 검색으로 필터링한 데이터를 정렬로직 실행 과정 중 기존 응답데이터에 덮어씌워서 검색 + 정렬 이후 기존 데이터가 일부 유실되는 상황이었습니다.
   2. MUI 라이브러리에 대한 지식이 부족해서 세세한 설정을 못한 탓이었습니다.

   ### 해결책

   1. 정렬하는 과정에서 기존 응답데이터를 그대로 쓰는 방식으로 논리 구조를 수정했습니다.
   2. 데드라인을 고려해서 구현에 초점을 맞춘 결과 tsx컴포넌트 내부 element에 inline style을 변수로 지정해 정의해줬습니다.

## 5. 사용기술（Skill）




`HTML5` `CSS3` `Javascript` `React.js` `TypeScript` `MUI` 

<br>

# 6. 자기 평가
메모장과는 별도로 게시판과 통계를 기반한 차트를 구현하고 싶었는데 개발 속도가 생각보다 늦어져서 그 점이 유감이었습니다. 그러나 상승률 및 거래량 + UI/UX적인 부분은 제가 생각한 내용으로 개발을 마쳤습니다.
추가적으로 컴포넌트 구조화 및 모듈 분리 등에 초점을 두지 않아서 리팩토링해야 할 코드가 많습니다.

지금의 완성도에 달하게 하는 것이 아니라, 보다 높은 프로젝트로 완성하고 싶었습니다.

추후에도 기능을 추가해가며 리펙토링 또는 마이그레이션 해 볼 예정입니다.


<br>



<br>

# 7. 조언해 주었으면 하는 점


미흡했던 부분이나 비효율적인 코드 또는 프로젝트 구조 부분에 대해서 조언해주셨으면 합니다.