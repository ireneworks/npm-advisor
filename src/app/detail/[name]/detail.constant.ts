export const promptTemplate = `
{package}를 도입하려고 고려하고 있습니다. 제 개발 환경은 {json} 이렇습니다.
만약에 입력한 package.json에 패키지가 3개 미만이거나,
입력한 package.json이 패키지 내용과 무관한게 많다면 result를 null로 해주세요.
답변은 JSON 형태로 다음과 같이 정리해주세요.
답변은 무조건 영어로 정리해주세요.
{ 
  result: boolean | null,
  description: string[], //bullet point로 어떤 패키지인지 정리된 설명
  suggestVersion: string[], //사용 가능한 버젼 또는 stable 버젼 또는 최신 버젼만 넣기
  otherSuggestion: string[], // 호환이 안된다면 다른 패키지나 대체 가능한 패키지 이름만 나열
  pros: string[], // 일반적인 장점 뿐만 아니라 프로젝트에 맞는 장점
  cons: string[], // 일반적인 단점 뿐만 아니라 프로젝트에 맞는 단점
  sampleCode: string,
}
`;
