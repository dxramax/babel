// @flow

import { types as tt, type TokenType } from "../tokenizer/types";
import type Parser from "../parser";
import * as N from "../types";
import { type BindingTypes, BIND_NONE, BIND_LEXICAL, BIND_VAR } from "../util/scopeflags";

export default (superClass: Class<Parser>): Class<Parser> =>
  class extends superClass {
    parseVarId(
      decl: N.VariableDeclarator,
      kind: "var" | "let" | "const",
    ): void {
      const startPos = this.state.start;
      const startLoc = this.state.startLoc;

      decl.id = this.parseBindingAtom();
      if (this.eat(tt.dot) && decl.id.type === "Identifier") {
        const node = this.startNodeAt(startPos, startLoc);
        node.left = decl.id;
        node.right = this.parseIdentifier();
        decl.id = this.finishNode(node, "DestructureNumberPattern");
      }
      this.checkLVal(
        decl.id,
        kind === "var" ? BIND_VAR : BIND_LEXICAL,
        undefined,
        "variable declaration",
        kind !== "var",
      );
    }

    checkLVal(
      expr: N.Expression,
      bindingType: BindingTypes = BIND_NONE,
      checkClashes: ?{ [key: string]: boolean },
      contextDescription: string,
      disallowLetBinding?: boolean,
    ): void {
      switch (expr.type) {
        case "DestructureNumberPattern":
          break;
        default:
          super.checkLVal(
            expr,
            bindingType,
            checkClashes,
            contextDescription,
            disallowLetBinding,
          );
      }
    }
  };
