export const promptTemplate = `
{package}를 도입하려고 고려하고 있습니다. 
프로젝트의 개발환경은 {json} 다음과 같은데 호환이 잘 되는지 사용 가능하다면 몇 버젼을 사용해야하는지 알려주세요.
부연설명은 불렛포인트로 정리해주세요.
그리고 프로젝트에서 사용 가능하다면 {package}를 사용하기 위한 샘플코드를 작성해주세요.
만약 {package}가 호환이 안된다면 다른 패키지를 추천해주세요.
답변은 JSON 형태로 다음과 같이 정리해주세요.
답변은 무조건 영어로 정리해주세요.
{ 
  result: boolean,
  description: string[], //bullet point로 어떤 패키지인지 정리된 설명
  suggestVersion: string[], //사용 가능한 버젼만 넣기
  otherSuggestion: string[], // 다른 패키지나 대체 가능한 패키지 이름만 나열해줘
  sampleCode: string,
  pros: string[], // 장점
  cons: string[], // 단점
}
`;
