# Chrome Extension : OG Tag Preview
현재 브라우저 탭의 url 정보를 받아와 해당 페이지를 크롤링하여 오픈 그래프 태그(OG Tag) 목록을 보여줍니다.<br />
'링크 미리보기' 기능은 네이버 블로그에서 링크를 삽입할 때 나타나는 미리보기 모양을 참고하여 만들었으며, 페이스북, 트위터, 카카오톡 등과 같은 소셜 페이지의 공유 미리보기 화면을 한눈에 볼 수 있도록 할 계획입니다.
<br/>

## Demo

<img height="500px" src='demo.gif'>

<br/>

## 기능 

#### 1. PREVIEW
- facebook, slack, twitter, line에서의 오픈 그래프 태그 미리보기
- 지정된 이미지 경로가 상대경로인 경우, 이미지 주소에 url 삽입

<br/>

#### 2. DEBUGGER
- 현재 페이지의 모든 오픈 그래프 태그 목록 출력

<br />

## 설치 및 실행

1. 소스코드 다운 및 빌드
```shell
git clone https://github.com/naye0ng/OG-Tag-Preview-Chrome-Extension.git
```

```shell
npm run build		// dist 폴더 생성
```
<br/>

2. 크롬 확장 프로그램에 추가
- 도구 더보기 => 확장 프로그램 => 압축해제된 확장 프로그램 로드합니다. => dist 폴더 업로드

<br/>

## 추가 기능

- [x] 페이스북, 트위터, 라인 등 소셜 페이지 지원
- [x] og:title, og:description, og:image, og:url 외 twitter, facebook 오픈 그래프 태그 추가
- [ ] 웹 개발자를 위한 OG태그 자동 생성 및 복사
- [ ] 로딩화면