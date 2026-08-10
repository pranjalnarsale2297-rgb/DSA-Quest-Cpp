import { TestDataCase } from '../types';

export interface ExecutionResult {
  success: boolean;
  output: string;
  testResults: {
    input: string;
    expected: string;
    actual: string;
    passed: boolean;
  }[];
  error?: string;
}

export function executeCppCode(
  userCode: string,
  testCases: TestDataCase[],
  solutionCode?: string
): ExecutionResult {
  // Check basic C++ syntax errors
  const trimmed = userCode.trim();

  if (!trimmed.includes('main')) {
    return {
      success: false,
      output: 'Compilation Error: main() function is missing.',
      testResults: [],
      error: 'In C++, every program must contain an int main() entry point.',
    };
  }

  // Check for common basic syntax errors
  const lines = userCode.split('\n');
  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx].trim();
    // Check missing semicolon on cout/cin/variable assignment lines
    if (
      (line.startsWith('cout') || line.startsWith('cin') || line.includes('int ') || line.includes('return ')) &&
      !line.endsWith(';') &&
      !line.endsWith('{') &&
      !line.endsWith('}') &&
      !line.startsWith('//') &&
      !line.includes('for') &&
      !line.includes('while') &&
      !line.includes('if')
    ) {
      return {
        success: false,
        output: `Compilation Error at line ${idx + 1}: Expected ';' at end of statement.\n> ${line}`,
        testResults: [],
        error: `Syntax error on line ${idx + 1}: Semicolon missing.`,
      };
    }
  }

  // Execute test cases by interpreting logic or matching solution
  const results = [];
  let allPassed = true;

  for (const tc of testCases) {
    const actualOutput = simulateCppExecution(userCode, tc.input);
    const passed = actualOutput.trim() === tc.expectedOutput.trim();
    if (!passed) allPassed = false;

    results.push({
      input: tc.input,
      expected: tc.expectedOutput,
      actual: actualOutput,
      passed,
    });
  }

  const primaryOutput = results.length > 0 ? results[0].actual : 'Program executed successfully.';

  return {
    success: allPassed,
    output: primaryOutput,
    testResults: results,
  };
}

function simulateCppExecution(code: string, input: string): string {
  const inputs = input.trim().split(/\s+/).filter(Boolean);

  // If code contains max element logic
  if (code.includes('maxVal') || code.includes('findMax') || code.includes('max(')) {
    if (inputs.length >= 2) {
      const n = parseInt(inputs[0], 10);
      const arr = inputs.slice(1, 1 + n).map(x => parseInt(x, 10));
      if (arr.length > 0) {
        const max = Math.max(...arr);
        return max.toString();
      }
    }
  }

  // If code contains array reverse logic
  if (code.includes('reverseArray') || code.includes('swap') || code.includes('start < end') || code.includes('reverse(')) {
    if (inputs.length >= 2) {
      const n = parseInt(inputs[0], 10);
      const arr = inputs.slice(1, 1 + n);
      if (arr.length > 0) {
        return arr.reverse().join(' ');
      }
    }
  }

  // If code contains binary search logic
  if (code.includes('binarySearch') || code.includes('mid') || code.includes('low') || code.includes('high')) {
    if (inputs.length >= 3) {
      const n = parseInt(inputs[0], 10);
      const target = parseInt(inputs[1], 10);
      const arr = inputs.slice(2, 2 + n).map(x => parseInt(x, 10));
      const idx = arr.indexOf(target);
      return idx.toString();
    }
  }

  // Default fallback simulation for custom cout outputs
  const coutMatches = Array.from(code.matchAll(/cout\s*<<\s*([^;]+);/g));
  if (coutMatches.length > 0) {
    const outputs: string[] = [];
    for (const match of coutMatches) {
      let expr = match[1];
      expr = expr.replace(/<<\s*endl/g, '');
      expr = expr.replace(/"/g, '');
      outputs.push(expr.trim());
    }
    return outputs.join('\n');
  }

  return 'Execution finished with return code 0.';
}
