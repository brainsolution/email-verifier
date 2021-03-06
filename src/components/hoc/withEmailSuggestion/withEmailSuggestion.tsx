import * as React from 'react';

interface IWithEmailSuggestionProps {
  id: string;
  domains: any[];
  value: string;
  multiple?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => any;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => any;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => any;
  autoFocus?: boolean;
  className?: string;
  placeholder?: string;
  type?: string;
}

// HOC wrapper around a jquery lib to autosuggest emails
// Learn more on https://github.com/samuelcastro/auto-email
// I was going to create a react version of if but I don't
// that time now ¯\_(ツ)_/¯ - Samuel

const withEmailSuggestion = (WrappedComponent: React.ComponentType) => {
    return class extends React.Component<IWithEmailSuggestionProps, any> {
      private $el: JQuery<HTMLElement>;

      public componentDidMount() {
        const el: string = `#${this.props.id}`;

        this.$el = $(el);

        $(document).ready(() => {
          (this.$el as any).autoEmail(this.props.domains, this.props.multiple);
        });

        this.$el.change((e: any) => setTimeout(() => this.props.onChange(e)))

        if (this.props.autoFocus) {
          this.$el.focus();
        }
      }

      public render() {
        return <WrappedComponent
          {...this.props}
        />
      }
   }
}

export default withEmailSuggestion;
