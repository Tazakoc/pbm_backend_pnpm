/**
 * Simplifies a stack trace by extracting the first function name, file path, and line number.
 *
 * @param stack - The stack trace to be simplified.
 * @returns The simplified stack trace, containing the first function name, file path, and line number.
 */
export function simplifyStack(stack: string | undefined): string | undefined {
  if (!stack) return undefined

  // Split the stack trace into lines
  const lines = stack.split('\n')

  // Remove 'at ' prefix from each line, keep file path, and filter out lines with '<anonymous>' or without a function name
  const simplifiedLines = lines
    .map((line) => {
      const match = line.match(/at (.*) \((.*):(\d+):(\d+)\)/)
      if (match && !line.includes('<anonymous>')) {
        const functionName = match[1]
        const filePath = match[2]
        const lineNumber = match[3]
        return '' + functionName + ' at line ' + lineNumber + ' on path: ' + filePath
      }
      return undefined
    })
    .filter((line) => line !== undefined)

  // Return only the first line
  return simplifiedLines[0]
}
