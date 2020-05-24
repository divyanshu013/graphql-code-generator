import { GraphQLSchema } from 'graphql';
import { PluginFunction, Types } from '@graphql-codegen/plugin-helpers';
import moment from 'moment';

export type TimePluginConfig =
  | string
  | {
      /**
       * @description Customize the Moment format of the output time.
       * @default YYYY-MM-DDTHH:mm:ssZ
       *
       * @examples
       * ```yml
       * generates:
       * path/to/file.ts:
       *  plugins:
       *    - time:
       *        format: DD.MM.YY
       * ```
       */
      format: string;
      /**
       * @description Customize the comment message
       * @default Generated in
       *
       * @examples
       * ```yml
       * generates:
       * path/to/file.ts:
       *  plugins:
       *    - time:
       *        message: "The file generated in: "
       * ```
       */
      message: string;
    };

export const plugin: PluginFunction<TimePluginConfig> = async (
  schema: GraphQLSchema,
  documents: Types.DocumentFile[],
  config: TimePluginConfig
): Promise<string> => {
  let format;
  let message = 'Generated in ';

  if (config && typeof config === 'string') {
    format = config;
  } else if (config && typeof config === 'object' && config.format) {
    format = config.format;

    if (config.message) {
      message = config.message;
    }
  } else {
    config = null;
  }

  return '// ' + message + moment().format(format) + '\n';
};
